import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasPageRoutingModule } from './facturas-routing.module';

import { FacturasPage } from './facturas.page';
import { MostrarComponent } from './mostrar/mostrar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturasPageRoutingModule
  ],
  declarations: [FacturasPage, MostrarComponent]
})
export class FacturasPageModule {}
