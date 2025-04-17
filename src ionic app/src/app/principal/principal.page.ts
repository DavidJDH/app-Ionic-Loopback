import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.obtenerUsertoken();

  }

  async obtenerUsertoken() {
    const { value } = await Preferences.get({ key: 'usuarioToken' });

    if (value !== null) {
      console.log(`Hello ${value}!`);
    }

  }

  async salir() {
    const { value } = await Preferences.get({ key: 'usuarioToken' });

    if (value !== null) {
      await Preferences.remove({ key: 'usuarioToken' });

    }
    this.router.navigate(['/']);
  }

}
