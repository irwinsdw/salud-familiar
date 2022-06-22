import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Familia } from 'src/app/core/models/familia';
import { Persona } from 'src/app/core/models/persona';
import { EstructuraFamiliarDialogComponent } from '../../dialogs/estructura-familiar-dialog/estructura-familiar-dialog.component';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-estructura-familiar',
  templateUrl: './estructura-familiar.component.html',
  styleUrls: ['./estructura-familiar.component.css']
})
export class EstructuraFamiliarComponent implements OnInit {

  persona!: Persona | undefined;

  personas: Persona[] = [];

  familias: Familia[] = [
    //OBTENER LOS familiaS DEL BACKEND por el SERVICE 
   
  ]

  displayedColumns: string[] = ['Nombres', 'DNI','Parentesco','GradoInstruccion' , 'Acciones'];

  dataSource: MatTableDataSource<Persona> = new MatTableDataSource(this.personas);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog, private personService: PersonaService, private _snackBar: MatSnackBar) { 

    
  }

  ngOnInit(): void {
  }

  buscarFamilia(nombreFamilia: string): void {
    console.log(nombreFamilia);
    this.familias.forEach(f => {
      if(f.nombre === nombreFamilia) {
        // this.dataSource = new MatTableDataSource(f.integrantesFamiliar);
        this.table.renderRows();
        console.log('FOUND')
        return
      }
      
    })
  }

  buscarPersonaPorDni(dni: string) {
    this.personas = []
    this.personService.buscarPersonaPorDni(dni)
        .subscribe(response => {
          console.log(response)
          this.personas.push(response.data)
          this.dataSource = new MatTableDataSource(this.personas);
          this.table.renderRows();
          this.openSnackBar(response.message)

        }, err => {
          this.openSnackBar(err.error.message)
        })
  }

  openDialogCrear(): void {
    const dialogRef = this.dialog.open(EstructuraFamiliarDialogComponent, {
      data: {persona: this.persona}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.persona = result;
      if(this.persona){
        // this.familias[0].integrantesFamiliar.push(this.persona);
        this.table.renderRows();
        this.persona = undefined;
      }

    });
  }

  openDialogActualizar(persona: Persona): void {
    const dialogRef = this.dialog.open(EstructuraFamiliarDialogComponent, {
      data: {persona: persona}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(!result){
        return
      }
      this.personas = [];
      this.personas.push(result)
      this.dataSource = new MatTableDataSource(this.personas);
        this.table.renderRows();
        this.persona = undefined;
      });
  }

  eliminarPersona(persona: Persona): void {
    // this.familias[0].integrantesFamiliar = this.familias[0].integrantesFamiliar.filter(e => e.id !== persona.id);
    // this.dataSource = new MatTableDataSource(this.familias[0].integrantesFamiliar);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

}
