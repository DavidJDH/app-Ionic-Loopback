import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  public url: string = "http://localhost:3000/";

  constructor() { }

  async obtenerfacturas() {
    const options = {
      url: this.url + 'facturas',
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    return response.data;

  }

  async registrarfactura(info: any) {
    const options = {
      url: this.url + 'facturas',
      headers: { "content-type": "application/json" },
      data: info,
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response;
  }

  async eliminarfactura(id: any) {
    const options = {
      url: this.url + 'facturas/' + id,
    };

    const response: HttpResponse = await CapacitorHttp.delete(options);

    return response;
  }

  async actualizarfactura(info: any, id: any) {
    const options = {
      url: this.url + 'facturas/' + id,
      headers: { "content-type": "application/json" },
      data: info,
    };

    const response: HttpResponse = await CapacitorHttp.patch(options);

    return response;
  }

  async obtenerfactura(id:any) {
    const options = {
      url: this.url + 'facturas/' + id,
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    return response.data;

  }
}
