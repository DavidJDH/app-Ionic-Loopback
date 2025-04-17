import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {



  public url: string = "http://localhost:3000/";
  constructor() { }

  async iniciarsesion(info: any) {

    const options = {
      url: this.url + 'users/login',
      headers: { "content-type": "application/json" },
      data: info,

    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response;
  }

 

  async currentUser(dato: string) {


    const options = {
      url: this.url + '/whoAmI',
      headers: {
        'Authorization': 'Bearer ' + dato
      },

    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data;
  }
}
