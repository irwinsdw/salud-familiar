import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Familia } from 'src/app/core/models/familia';
import { HistoriaFamiliar } from 'src/app/core/models/historia-familiar';
import { HistoriaFamiliarDialogComponent } from '../../dialogs/historia-familiar-dialog/historia-familiar-dialog.component';

@Component({
  selector: 'app-historia-familiar',
  templateUrl: './historia-familiar.component.html',
  styleUrls: ['./historia-familiar.component.css']
})
export class HistoriaFamiliarComponent implements OnInit {
  historiaFamiliar!: HistoriaFamiliar | undefined;

  familias: Familia[] = [
    //OBTENER LOS familiaS DEL BACKEND por el SERVICE 
    
  ]

  listaHistoriaFamiliar: HistoriaFamiliar[] = [
    //OBTENER LOS familiaS DEL BACKEND por el SERVICE 
    {id: 1,familia: this.familias[0],numeroHistoria:'CA319',subSector:'CA112', condicionEncuesta: 'casa encuestada',
    observacion: 'Sin asignar', fechaApertura: '12-08-2021',numeroVisitaPresencial: '1ra presencial',numeroVisitaRemota: '2da presencial'},
    {id: 2,familia: this.familias[1],numeroHistoria:'CA318',subSector:'CA113', condicionEncuesta: 'casa cerrada',
    observacion: 'Sin asignar', fechaApertura: '13-08-2021',numeroVisitaPresencial: '2da presencial',numeroVisitaRemota: '1ra presencial'},
    {id: 3,familia: this.familias[2],numeroHistoria:'CA317',subSector:'CA114', condicionEncuesta: 'casa renuente',
    observacion: 'Sin asignar', fechaApertura: '14-08-2021',numeroVisitaPresencial: '1ra presencial',numeroVisitaRemota: '3ra presencial'},
    {id: 4,familia: this.familias[3],numeroHistoria:'CA316',subSector:'CA115', condicionEncuesta: 'casa encuestada',
    observacion: 'Sin asignar', fechaApertura: '18-08-2021',numeroVisitaPresencial: '3ra presencial',numeroVisitaRemota: '2da presencial'},
    {id: 5,familia: this.familias[4],numeroHistoria:'CA315',subSector:'CA116', condicionEncuesta: 'lote vacío',
    observacion: 'Sin asignar', fechaApertura: '11-08-2021',numeroVisitaPresencial: '3ra presencial',numeroVisitaRemota: '2da presencial'},
    

  ]

  displayedColumns: string[] = ['Familia','Sector' ,'CondicionEncuesta','FechaApertura','VisitaPresencial', 'Acciones'];

  dataSource: MatTableDataSource<HistoriaFamiliar> = new MatTableDataSource(this.listaHistoriaFamiliar);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog) { 
    this.dataSource.filterPredicate = (data: HistoriaFamiliar, filter: string) => {
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

  openDialogActualizar(historiaFamiliar: HistoriaFamiliar): void {
    const dialogRef = this.dialog.open(HistoriaFamiliarDialogComponent, {
      data: {historiaFamiliar: historiaFamiliar}
    });

    dialogRef.afterClosed().subscribe(result => {
      historiaFamiliar = result;
      this.table.renderRows();
    });
  }

  openDialogCrear(): void {
    const dialogRef = this.dialog.open(HistoriaFamiliarDialogComponent, {
      data: {historiaFamiliar: this.historiaFamiliar}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.historiaFamiliar = result;
      if(this.historiaFamiliar){
        this.listaHistoriaFamiliar.push(this.historiaFamiliar);
        this.table.renderRows();
        this.historiaFamiliar = undefined;
      }

    });
  }

  eliminarfamilia(historiaFamiliar: HistoriaFamiliar): void {
    this.listaHistoriaFamiliar = this.listaHistoriaFamiliar.filter(e => e.id !== historiaFamiliar.id);
    this.dataSource = new MatTableDataSource(this.listaHistoriaFamiliar);
  }
}
