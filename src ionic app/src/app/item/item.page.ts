import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { Producto } from '../models/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {


  public items: Item[] = [];
  public productos: Producto[] = [];
  public formitem: FormGroup;
  public button: boolean = false;
  public input: boolean = false;
  

  constructor(
    private servicioitem: ItemService,
    private servicioproducto: ProductoService,
    private formBuilder: FormBuilder
  ) {
    this.formitem = this.formBuilder.group({
      id: ['', Validators.required],
      detalle: ['', Validators.required],
      producto: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.listaritems();
    this.listarproducto();
  }

  listaritems() {
    this.servicioitem.obteneritems().then((res: Item[]) => {
      this.items = [];
      this.items = res;

      console.log(this.items);

    }).catch(error => {
      console.log(error);

    });
  }

  listarproducto() {
    this.servicioproducto.obtenerproductos().then((res: Producto[]) => {
      this.productos = [];
      this.productos = res;

      console.log(this.productos);

    }).catch((error: any) => {
      console.log(error);

    });
  }

  registraritem() {


    const item: Item = {
      id: this.formitem.value.id,
      detalle: this.formitem.value.detalle,
      producto_id: this.formitem.value.producto.toString(),


    }



    this.servicioitem.registraritem(item).then(() => {
      console.log("Registrado");

    }).catch(error => {
      console.log(error);

    }); 


  }

  actualizaritem() {
    const item: Item = {
      id: this.formitem.value.id,
      detalle: this.formitem.value.detalle,
      producto_id: this.formitem.value.producto.toString(),

    }




    const id = this.formitem.value.id;

    if (id != null) {
      this.servicioitem.actualizaritem(item, id).then(() => {
        console.log("Actualizado");
        this.limpiar();

      }).catch(error => {
        console.log(error);

      });
    }


  }

  eliminaritem(id: any) {
    this.servicioitem.eliminaritem(id).then(() => {
      console.log("Eliminado");

    }).catch(error => {
      console.log(error);

    });
  }

  onitem(id: any) {


    this.servicioitem.obteneritem(id).then((res: Item) => {
      console.log(res.id);


      if (res.id) {
        this.button = true;
        this.input = true;
        this.formitem.setValue({
          id: res.id,
          detalle: res.detalle,
          producto: res.producto_id
        });

      }

    }).catch(error => {
      console.log(error);

    });


  }

  limpiar() {
    this.button = false;
    this.input = false;
    this.formitem.setValue({
      id: "",
      detalle: "",
      producto: ""

    });
  }

}  
