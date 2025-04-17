import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public url: string = "http://localhost:3000/";

  constructor() { }

  async obtenercategorias() {
    const options = {
      url: this.url + 'categorias',
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    

    return response.data;

  }

  async registrarcategoria(info: any) {
    const options = {
      url: this.url + 'categorias',
      headers: { "content-type": "application/json" },
      data: info,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response;
  }

  async eliminarcategoria(id: any) {
    const options = {
      url: this.url + 'categorias/' + id,
    };

    const response: HttpResponse = await CapacitorHttp.delete(options);

    return response;
  }

  async actualizarcategoria(info: any, id: any) {

    
    const options = {
      url: this.url + 'categorias/' + id,
      headers: { "content-type": "application/json" },
      data: info,
    };

    const response: HttpResponse = await CapacitorHttp.patch(options);

    return response;
  }

  async obtenercategoria(id:any) {
    const options = {
      url: this.url + 'categorias/' + id,
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    return response.data;

  }
}
