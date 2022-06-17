import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

//Angular Material modules
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
