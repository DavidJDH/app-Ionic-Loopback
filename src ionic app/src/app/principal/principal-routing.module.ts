import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPage,

    children: [
      {
        path: 'registrar',
        loadChildren: () => import('./../registrar/registrar.module').then( m => m.RegistrarPageModule)
      },

      {
        path: 'facturas',
        loadChildren: () => import('./../facturas/facturas.module').then( m => m.FacturasPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalPageRoutingModule {}
