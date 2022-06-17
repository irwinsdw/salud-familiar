import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';


//Angular Material Modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatRadioModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NavbarComponent,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatRadioModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class SharedModule { }
