import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: string = "http://localhost:3000/";

  constructor() { }

  async obtenerproductos() {
    const options = {
      url: this.url + 'productos',
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    return response.data;

  }

  async registrarproducto(info: any) {
    const options = {
      url: this.url + 'productos',
      headers: { "content-type": "application/json" },
      data: info,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response;
  }

  async eliminarproducto(id: any) {
    const options = {
      url: this.url + 'productos/' + id,
    };

    const response: HttpResponse = await CapacitorHttp.delete(options);

    return response;
  }

  async actualizarproducto(info: any, id: any) {
    const options = {
      url: this.url + 'productos/' + id,
      headers: { "content-type": "application/json" },
      data: info,
    };

    const response: HttpResponse = await CapacitorHttp.patch(options);

    return response;
  }

  async obtenerproducto(id:any) {
    const options = {
      url: this.url + 'productos/' + id,
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    return response.data;

  }
}
