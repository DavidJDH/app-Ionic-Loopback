import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  public categorias: Categoria[] = [];
  public formCategoria: FormGroup;
  public button: boolean = false;
  public input: boolean = false;

  constructor(
    private serviciocategoria: CategoriaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formCategoria = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.listarcategorias();
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


  registrarcategoria() {

    const categoria: Categoria = {
      id: this.formCategoria.value.id,
      nombre: this.formCategoria.value.nombre,

    }

    this.serviciocategoria.registrarcategoria(categoria).then(() => {
      console.log("Registrado");
      this.router.navigate(['/categoria']);

    }).catch(error => {
      console.log(error);

    });


  }

  actualizarcategoria() {

    const categoria: Categoria = {
      id: this.formCategoria.value.id,
      nombre: this.formCategoria.value.nombre,

    }

    const id = this.formCategoria.value.id;

    if (id!=null) {
      this.serviciocategoria.actualizarcategoria(categoria,id).then(() => {
        console.log("Actualizado");
        this.limpiar();

      }).catch(error => {
        console.log(error);

      });
    }


  }

  eliminarcategoria(id: any) {
    this.serviciocategoria.eliminarcategoria(id).then(() => {
      console.log("Eliminado");

    }).catch(error => {
      console.log(error);

    });
  }

  oncategoria(id: any) {


    this.serviciocategoria.obtenercategoria(id).then((res: Categoria) => {

      if (res.id) {
        this.button = true;
        this.input = true;
        this.formCategoria.setValue({
          id: res.id,
          nombre: res.nombre,

        });

      }

    }).catch(error => {
      console.log(error);

    });


  }

  limpiar() {
    this.button = false;
    this.input = false;
    this.formCategoria.setValue({
      id: "",
      nombre: "",


    });
  }

}
