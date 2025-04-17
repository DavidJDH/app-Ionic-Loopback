import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  public productos: Producto[] = [];
  public categorias: Categoria[] = [];
  public formProducto: FormGroup;
  public button: boolean = false;
  public input: boolean = false;

  constructor(
    private servicioproducto: ProductoService,
    private serviciocategoria: CategoriaService,
    private formBuilder: FormBuilder
  ) {
    this.formProducto = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      detalle: ['', Validators.required],
      precio: ['', Validators.required],
      categoria: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.listarproductos();
    this.listarcategorias();
  }

  listarproductos() {
    this.servicioproducto.obtenerproductos().then((res: Producto[]) => {
      this.productos = [];
      this.productos = res;

      console.log(this.productos);

    }).catch(error => {
      console.log(error);

    });
  }

  listarcategorias() {
    this.serviciocategoria.obtenercategorias().then((res: Categoria[]) => {
      this.categorias = [];
      this.categorias = res;

      console.log(this.categorias);

    }).catch(error => {
      console.log(error);

    });
  }

  registrarproducto() {


    const producto: Producto = {
      id: this.formProducto.value.id,
      nombre: this.formProducto.value.nombre,
      precio: this.formProducto.value.precio,
      detalle: this.formProducto.value.detalle,
      categoria_id: this.formProducto.value.categoria.toString(),


    }

    console.log(producto.categoria_id);
    
    this.servicioproducto.registrarproducto(producto).then(() => {
      console.log("Registrado");

    }).catch(error => {
      console.log(error);

    });


  }

  actualizarproducto() {

    const producto: Producto = {
      id: this.formProducto.value.id,
      nombre: this.formProducto.value.nombre,
      precio: this.formProducto.value.precio,
      detalle: this.formProducto.value.detalle,
      categoria_id: this.formProducto.value.categoria.toString(),

    }

    const id = this.formProducto.value.id;

    if (id != null) {
      this.servicioproducto.actualizarproducto(producto, id).then(() => {
        console.log("Actualizado");
        this.limpiar();

      }).catch(error => {
        console.log(error);

      });
    }


  }

  eliminarproducto(id: any) {
    this.servicioproducto.eliminarproducto(id).then(() => {
      console.log("Eliminado");

    }).catch(error => {
      console.log(error);

    });
  }

  onproducto(id: any) {


    this.servicioproducto.obtenerproducto(id).then((res: Producto) => {
      console.log(res.id);


      if (res.id) {
        this.button = true;
        this.input = true;
        this.formProducto.setValue({
          id: res.id,
          nombre: res.nombre,
          detalle: res.detalle,
          precio: res.precio,
          categoria: res.categoria_id

        });

      }

    }).catch(error => {
      console.log(error);

    });


  }

  limpiar() {
    this.button = false;
    this.input = false;
    this.formProducto.setValue({
      id: "",
      nombre: "",
      detalle: "",
      precio: "",
      categoria: ""



    });
  }

}
