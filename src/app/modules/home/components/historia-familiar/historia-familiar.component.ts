import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Familia } from 'src/app/core/models/familia';
import { Encuesta } from 'src/app/core/models/encuesta';
import { HistoriaFamiliarDialogComponent } from '../../dialogs/historia-familiar-dialog/historia-familiar-dialog.component';

@Component({
  selector: 'app-historia-familiar',
  templateUrl: './historia-familiar.component.html',
  styleUrls: ['./historia-familiar.component.css']
})
export class HistoriaFamiliarComponent implements OnInit {
  encuesta!: Encuesta | undefined;

  familias: Familia[] = [
    //OBTENER LOS familiaS DEL BACKEND por el SERVICE 
    
  ]

  listaHistoriaFamiliar: Encuesta[] = [
    

  ]

  displayedColumns: string[] = ['Familia','Sector' ,'CondicionEncuesta','FechaApertura','VisitaPresencial', 'Acciones'];

  dataSource: MatTableDataSource<Encuesta> = new MatTableDataSource(this.listaHistoriaFamiliar);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog) { 
    this.dataSource.filterPredicate = (data: Encuesta, filter: string) => {
      return data.familia.nombre.toLocaleLowerCase().includes(filter);
    }
    
  }

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

  }

  filtrarHistoriaFamiliar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  openDialogActualizar(encuesta: Encuesta): void {
    const dialogRef = this.dialog.open(HistoriaFamiliarDialogComponent, {
      data: {encuesta: encuesta}
    });

    dialogRef.afterClosed().subscribe(result => {
      encuesta = result;
      this.table.renderRows();
    });
  }

  openDialogCrear(): void {
    const dialogRef = this.dialog.open(HistoriaFamiliarDialogComponent, {
      data: {encuesta: this.encuesta}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.encuesta = result;
      if(this.encuesta){
        this.listaHistoriaFamiliar.push(this.encuesta);
        this.table.renderRows();
        this.encuesta = undefined;
      }

    });
  }

  eliminarfamilia(encuesta: Encuesta): void {
    this.listaHistoriaFamiliar = this.listaHistoriaFamiliar.filter(e => e.id !== encuesta.id);
    this.dataSource = new MatTableDataSource(this.listaHistoriaFamiliar);
  }
}
