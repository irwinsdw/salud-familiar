import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Familia } from 'src/app/core/models/familia';
import { Persona } from 'src/app/core/models/persona';
import { FamiliaService } from '../../services/familia.service';
import { EstructuraFamiliarDialogComponent } from '../estructura-familiar-dialog/estructura-familiar-dialog.component';

@Component({
  selector: 'app-miembros-familia',
  templateUrl: './miembros-familia.component.html',
  styleUrls: ['./miembros-familia.component.css']
})
export class MiembrosFamiliaComponent implements OnInit {

  familia: Familia = new Familia();
  miembrosFamilia: Persona[] = [];

  displayedColumns: string[] = ['nombreCompleto','dni','Acciones'];
  dataSource: MatTableDataSource<Persona> = new MatTableDataSource(this.miembrosFamilia);
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog, private _snackBar: MatSnackBar, private familiaService: FamiliaService) { }

  ngOnInit(): void {
    this.familia = this.data.familia;
    this.familiaService.listarMiembrosFamiliaPorIdFamilia(this.familia.id)
        .subscribe(response => {
          this.miembrosFamilia = response.data;
          this.dataSource = new MatTableDataSource(this.miembrosFamilia);
        })

  }

  openEstructuraFamiliar(){
    const dialogRef = this.dialog.open(EstructuraFamiliarDialogComponent, {
      data: {familia: this.familia}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.miembrosFamilia.push(result);
        this.dataSource = new MatTableDataSource(this.miembrosFamilia);
      }
    });
  }

  openEstructuraFamiliarEditar(persona: Persona){
    const dialogRef = this.dialog.open(EstructuraFamiliarDialogComponent, {
      data: {persona: persona}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.miembrosFamilia = this.miembrosFamilia.map(m => {
          if(m.id == result.id){
            return result;
          }
          return m
        })
        this.dataSource = new MatTableDataSource(this.miembrosFamilia);
      }
    });
  }

}