import { Component } from '@angular/core';
import { AutenticacionService } from '../services/autenticacion.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public loginform: FormGroup;

  constructor(
    private serviceautenticacion: AutenticacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      clave: ['', Validators.required],

    });

  }

  ngOnInit() { }


  loggear() {

    const datos: any = {
      email: this.loginform.value.email,
      password: this.loginform.value.clave
    }

    this.serviceautenticacion.iniciarsesion(datos)
      .then(async res => {
        const tk = res.data.token;


        if (tk) {

          this.serviceautenticacion.currentUser(tk)
            .then(async res => {
              console.log("user id ", res);

              const userid = res;

              if (userid !== null) {
                await Preferences.set({
                  key: 'usuarioToken',
                  value: tk,
                });
                this.router.navigate(['/principal']);
              }


            })
            .catch(error => {
              console.log(error);

            })


        } else {

          const alert = await this.alertController.create({

            message: 'Credenciales incorrectas',
            buttons: ['OK']
          });

          await alert.present();


        }


      })
      .catch(error => {
        console.log(error);
      })
  }

}
