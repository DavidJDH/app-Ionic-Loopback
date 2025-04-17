import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss'],
})
export class MostrarComponent  implements OnInit {

  public facturas:Factura[]=[];


  constructor(
    private serviciofactura:FacturaService
  ) { }

  ngOnInit() {
    this.listarFacturas();
  }

  listarFacturas() {
    this.serviciofactura.obtenerfacturas().then((res: Factura[]) => {
      this.facturas = [];
      this.facturas = res;

      console.log(this.facturas);

    }).catch(error => {
      console.log(error);

    });
  }

  eliminar(id:any){
    this.serviciofactura.eliminarfactura(id).then(()=>{
      console.log("factura eliminada");
      
    })
  }
}
