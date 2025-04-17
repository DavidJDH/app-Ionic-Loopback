import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public url: string = "http://localhost:3000/";

  constructor() { }

  async obteneritems() {
    const options = {
      url: this.url + 'items',
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    return response.data;

  }

  async registraritem(info: any) {
    console.log(info);
    
    const options = {
      url: this.url + 'items',
      headers: { "content-type": "application/json" },
      data: info,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response;
  }

  async eliminaritem(id: any) {
    const options = {
      url: this.url + 'items/' + id,
    };

    const response: HttpResponse = await CapacitorHttp.delete(options);

    return response;
  }

  async actualizaritem(info: any, id: any) {
    const options = {
      url: this.url + 'items/' + id,
      headers: { "content-type": "application/json" },
      data: info,
    };

    const response: HttpResponse = await CapacitorHttp.patch(options);

    return response;
  }

  async obteneritem(id: any) {
    const options = {
      url: this.url + 'items/' + id,
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    return response.data;

  }
}
