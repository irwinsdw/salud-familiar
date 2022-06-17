import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Familia } from 'src/app/core/models/familia';
import { IntegranteFamiliar } from 'src/app/core/models/integrante-familiar';
import { EstructuraFamiliarDialogComponent } from '../../dialogs/estructura-familiar-dialog/estructura-familiar-dialog.component';

@Component({
  selector: 'app-estructura-familiar',
  templateUrl: './estructura-familiar.component.html',
  styleUrls: ['./estructura-familiar.component.css']
})
export class EstructuraFamiliarComponent implements OnInit {

  integranteFamiliar!: IntegranteFamiliar | undefined;

  integranteFamiliar1: IntegranteFamiliar = {id:1,nombreApellidos:'Bengolea Sánchez Anderson',
      parentesco: 'HIJO MENOR',estadoCivil: 'Soltero', seguroMedico:'ESSALUD', fechaNacimiento:'18-08-1994',dni:'70267159',sexo:'masculino',
      gradoInstruccion:'SECUNDARIA COMPLETA', ocupacion:'Desarrollador',clasificacionRiesgo:['Otros'],
      gestante:'NO',idioma:'Español',religion:'Católico',pertenenciaEtnica:'Hispano'};
  integranteFamiliar2: IntegranteFamiliar = {id:2,nombreApellidos:'Bengolea Sánchez Madyson',
      parentesco: 'HIJO MAYOR',estadoCivil: 'Casado', seguroMedico:'ESSALUD', fechaNacimiento:'09-09-2015',dni:'70233159',sexo:'femenino',
      gradoInstruccion:'Inicial', ocupacion:'Estudiante',clasificacionRiesgo:['Otros'],
      gestante:'NO',idioma:'Español',religion:'Católico',pertenenciaEtnica:'Hispano'};

      integranteFamiliar3: IntegranteFamiliar = {id:3,nombreApellidos:'Arotinco Velasquez Hely',
      parentesco: 'HIJO MAYOR',estadoCivil: 'Casado', seguroMedico:'ESSALUD', fechaNacimiento:'09-09-2015',dni:'72167159',sexo:'femenino',
      gradoInstruccion:'UNIVERSIDAD', ocupacion:'Administrador',clasificacionRiesgo:['Otros'],
      gestante:'NO',idioma:'Español',religion:'Católico',pertenenciaEtnica:'Hispano'};

  integrantesDeFamilia: IntegranteFamiliar[] = [];

  familias: Familia[] = [
    //OBTENER LOS familiaS DEL BACKEND por el SERVICE 
   
  ]

  displayedColumns: string[] = ['Nombres', 'DNI','Parentesco','GradoInstruccion' , 'Acciones'];

  dataSource: MatTableDataSource<IntegranteFamiliar> = new MatTableDataSource(this.integrantesDeFamilia);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog) { 

    
  }

  ngOnInit(): void {
  }

  buscarFamilia(nombreFamilia: string): void {
    console.log(nombreFamilia);
    this.familias.forEach(f => {
      if(f.nombre === nombreFamilia) {
        this.dataSource = new MatTableDataSource(f.integrantesFamiliar);
        this.table.renderRows();
        console.log('FOUND')
        return
      }
      
    })
  }

  openDialogCrear(): void {
    const dialogRef = this.dialog.open(EstructuraFamiliarDialogComponent, {
      data: {integranteFamiliar: this.integranteFamiliar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.integranteFamiliar = result;
      if(this.integranteFamiliar){
        this.familias[0].integrantesFamiliar.push(this.integranteFamiliar);
        this.table.renderRows();
        this.integranteFamiliar = undefined;
      }

    });
  }

  openDialogActualizar(integranteFamiliar: IntegranteFamiliar): void {
    const dialogRef = this.dialog.open(EstructuraFamiliarDialogComponent, {
      data: {integranteFamiliar: integranteFamiliar}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.integranteFamiliar = result;
        this.table.renderRows();
        this.integranteFamiliar = undefined;
      });
  }

  eliminarIntegranteFamiliar(integranteFamiliar: IntegranteFamiliar): void {
    this.familias[0].integrantesFamiliar = this.familias[0].integrantesFamiliar.filter(e => e.id !== integranteFamiliar.id);
    this.dataSource = new MatTableDataSource(this.familias[0].integrantesFamiliar);
  }

}
