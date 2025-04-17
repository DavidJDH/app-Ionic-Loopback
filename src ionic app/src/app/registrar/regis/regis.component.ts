import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/models/articulo';
import { Factura } from 'src/app/models/factura';
import { Item } from 'src/app/models/item';
import { Producto } from 'src/app/models/producto';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ItemService } from 'src/app/services/item.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.scss'],
})
export class RegisComponent implements OnInit {
  public items: Item[] = [];
  public productos: Producto[] = [];
  public articulos: Articulo[] = [];

  public fecha: Date = new Date();
  public subtotal: number = 100;
  public iva: number = 15;
  public descuento: number = 0;
  public total: number = 100;
  public userid: string = "";
  public id;




  constructor(
    private servicioitem: ItemService,
    private servicioproducto: ProductoService,
    private servciofactura: FacturaService,
    private servicioautenticacion: AutenticacionService,
    private alertController: AlertController,
    private router: Router,
    private aroute: ActivatedRoute
  ) {
    this.id = this.aroute.snapshot.paramMap.get('id');


  }
  ngOnInit() {
    this.listaritems();
    this.listarproducto();

    if (this.id == null) {
      this.obtenerUsuario();
    } else {
      this.obtenerfactura();

    }
  }

  async obtenerUsuario() {
    const { value } = await Preferences.get({ key: 'usuarioToken' });

    if (value !== null) {
      this.servicioautenticacion.currentUser(value).then(res => {
        this.userid = res;
      })
    }
  }

  listaritems() {
    this.servicioitem.obteneritems().then((res) => {
      this.items = [];
      this.items = res;

      console.log(this.items);

    }).catch(error => {
      console.log(error);

    });
  }

  listarproducto() {
    this.servicioproducto.obtenerproductos().then((res) => {
      this.productos = [];
      this.productos = res;

      console.log(this.productos);

    }).catch((error: any) => {
      console.log(error);

    });
  }

  async agregararticulo(id: any) {
    let ite: any = this.items.filter(i => i.producto_id == id)
    let pro: any = this.productos.filter(p => p.id == id);

    let iditem: any;
    let detalleitem: any;
    let nombreproducto: any;
    let precioproducto: any


    ite.forEach((element: any) => {
      iditem = element.id
      detalleitem = element.detalle

    });

    pro.forEach((element: any) => {
      nombreproducto = element.nombre;
      precioproducto = element.precio;

    });

    const articulo: Articulo = {
      id: iditem,
      detalle: detalleitem,
      nombre: nombreproducto,
      precio: precioproducto
    }


    let art = this.articulos.find(a => a.id == iditem);

    if (art == null) {
      this.articulos.push(articulo);
      console.log(this.articulos);
    } {

      const alert = await this.alertController.create({

        message: nombreproducto + ' ya esta en la lista de articulos',
        buttons: ['OK']
      });

      await alert.present();


    }



  }

  removerarticulo(id: any) {

    let darticulos = this.articulos;
    this.articulos = darticulos.filter(d => d.id != id);

  }

  async registrarfactura() {
    const factura: Factura = {
      fecha: this.fecha,
      articulos: this.articulos,
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total,
      descuento: this.descuento,
      userId: this.userid,
    }


    if (this.userid !== "") {
      if (this.articulos.length > 0) {

        if (this.id==null) {
          this.servciofactura.registrarfactura(factura).then(() => {
            this.router.navigate(['/facturas']);
  
          })
          
        } else {
          this.servciofactura.actualizarfactura(factura,this.id).then(() => {
            this.router.navigate(['/facturas']);
  
          })
          
        }


      } else {
        const alert = await this.alertController.create({

          message: 'Debe agregar articulos para registrar una factura',
          buttons: ['OK']
        });

        await alert.present();

      }
    } else {
      const alert = await this.alertController.create({

        message: 'Inicie sesion para registrar una factura',
        buttons: ['OK']
      });

      await alert.present();
    }
  }


  obtenerfactura() {
    this.servciofactura.obtenerfactura(this.id).then(res => {

      console.log(res);

      this.articulos = res.articulos;
      this.fecha = res.fecha;
      this.subtotal = res.subtotal;
      this.iva = res.iva;
      this.descuento = res.descuento;
      this.total = res.total;
      this.userid = res.userId;

    })
  }

}
