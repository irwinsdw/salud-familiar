import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Encuesta } from 'src/app/core/models/encuesta';
import { Familia } from 'src/app/core/models/familia';
import { Persona } from 'src/app/core/models/persona';
import { FamiliaService } from '../../services/familia.service';
import { HistoriaFamiliarDialogComponent } from '../historia-familiar-dialog/historia-familiar-dialog.component';

@Component({
  selector: 'app-encuestas-familia',
  templateUrl: './encuestas-familia.component.html',
  styleUrls: ['./encuestas-familia.component.css']
})
export class EncuestasFamiliaComponent implements OnInit {

  familia: Familia = new Familia();
  encuestas: Encuesta[] = [];

  displayedColumns: string[] = ['condicion','observacion','Acciones'];
  dataSource: MatTableDataSource<Encuesta> = new MatTableDataSource(this.encuestas);
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog, private _snackBar: MatSnackBar, private familiaService: FamiliaService) { }

  ngOnInit(): void {
    this.familia = this.data.familia;
    this.familiaService.listarEncuestasPorIdFamilia(this.familia.id)
        .subscribe(response => {
          this.encuestas = response.data;
          this.dataSource = new MatTableDataSource(this.encuestas);
        })

  }

  openEncuestaDialog(){
    const dialogRef = this.dialog.open(HistoriaFamiliarDialogComponent, {
      data: {familia: this.familia}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.encuestas.push(result);
        this.dataSource = new MatTableDataSource(this.encuestas);
      }
    });
  }

  openEncuestaEditarDialog(encuesta: Encuesta){
    const dialogRef = this.dialog.open(HistoriaFamiliarDialogComponent, {
      data: {encuesta: encuesta}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.encuestas = this.encuestas.map(m => {
          if(m.id == result.id){
            return result;
          }
          return m
        })
        this.dataSource = new MatTableDataSource(this.encuestas);
      }
    });
  }


}
