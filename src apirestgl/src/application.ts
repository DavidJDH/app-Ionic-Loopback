import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import { RestExplorerBindings,RestExplorerComponent,} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

// ---------- ADD IMPORTS -------------
import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  MyUserService,
  SECURITY_SCHEME_SPEC,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { ReceiptDataSource } from './datasources/receipt.datasource';


export {ApplicationConfig};

export class ApirestglApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
   // Mount authentication system
 this.component(AuthenticationComponent);
    // Mount jwt component
 this.component(JWTAuthenticationComponent);
 // Bind datasource
  // This is where your User data will be stored.
  this.dataSource(ReceiptDataSource, UserServiceBindings.DATASOURCE_NAME);
 // Bind the user service to the one in @loopback/authentication-jwt
  this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }
}
