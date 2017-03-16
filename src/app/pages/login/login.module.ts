import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';
import { routing }       from './login.routing';
import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { Auth } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],  providers:    [
        AUTH_PROVIDERS,Auth
    ],
  declarations: [
    Login
  ]
})
export class LoginModule {}
