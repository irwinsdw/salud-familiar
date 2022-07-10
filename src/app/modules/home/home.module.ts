import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EstablecimientoComponent } from './components/establecimiento/establecimiento.component';

//Angular Material Modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { EstablecimientoDialogComponent } from './dialogs/establecimiento-dialog/establecimiento-dialog.component';
import { FamiliaComponent } from './components/familia/familia.component';
import { FamiliaDialogComponent } from './dialogs/familia-dialog/familia-dialog.component';
import { HistoriaFamiliarDialogComponent } from './dialogs/historia-familiar-dialog/historia-familiar-dialog.component';
import { EstructuraFamiliarComponent } from './components/estructura-familiar/estructura-familiar.component';
import { EstructuraFamiliarDialogComponent } from './dialogs/estructura-familiar-dialog/estructura-familiar-dialog.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { EmpleadoVOComponent } from './components/empleado-vo/empleado-vo.component';
import { EmpleadoDialogComponent } from './dialogs/empleado-dialog/empleado-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HistoriaFamiliarComponent } from './components/historia-familiar/historia-familiar.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MiembrosFamiliaComponent } from './dialogs/miembros-familia/miembros-familia.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { EncuestasFamiliaComponent } from './dialogs/encuestas-familia/encuestas-familia.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
registerLocaleData(localeES, 'es');
@NgModule({
  declarations: [
  
    HomePageComponent,
    EstablecimientoComponent,
    EstablecimientoDialogComponent,
    FamiliaComponent,
    FamiliaDialogComponent,
    HistoriaFamiliarComponent,
    HistoriaFamiliarDialogComponent,
    EstructuraFamiliarComponent,
    EstructuraFamiliarDialogComponent,
    EmpleadoComponent,
    EmpleadoVOComponent,
    EmpleadoDialogComponent,
    MiembrosFamiliaComponent,
    EncuestasFamiliaComponent
              
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    SharedModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDialogModule,
    FormsModule, 
    MatAutocompleteModule,
    MatSnackBarModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ] , 
  providers:[
    { provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true},
    { provide: LOCALE_ID, useValue: 'es' }

   ]
})
export class HomeModule { }