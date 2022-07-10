import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Familia } from 'src/app/core/models/familia';
import { CaracteristicasFamiliaDialogComponent } from '../../dialogs/caracteristicas-familia-dialog/caracteristicas-familia-dialog.component';
import { EncuestasFamiliaComponent } from '../../dialogs/encuestas-familia/encuestas-familia.component';
import { FamiliaDialogComponent } from '../../dialogs/familia-dialog/familia-dialog.component';
import { HistoriaFamiliarDialogComponent } from '../../dialogs/historia-familiar-dialog/historia-familiar-dialog.component';
import { MiembrosFamiliaComponent } from '../../dialogs/miembros-familia/miembros-familia.component';
import { FamiliaService } from '../../services/familia.service';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {
  pageEvent!: PageEvent;
 
  familias!: Familia | undefined;
  familia : Familia[] = [];
  familiaBuscar:string = '';
  data:any;


  
    //OBTENER LOS empleados DEL BACKEND por el SERVICE 
    
  

    displayedColumns: string[] = ['numero_historia','nombre','telefono','empleado','fechaCreacion','Acciones'];
  dataSource: MatTableDataSource<Familia> = new MatTableDataSource(this.familia);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog,private familiaService:FamiliaService, private _snackBar: MatSnackBar) { 
    let nombreempleado: string[] = [];
    this.familia.forEach(e => nombreempleado.push(e.nombre));
    
  }

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

  }


      filtrarFamilia(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

      }

      openDialogActualizar(familia: Familia): void {
        const dialogRef = this.dialog.open(FamiliaDialogComponent, {
          data: {familia: familia}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(result)
          if(result == undefined) {
            return
          }
          this.familia = [];
          this.familia.push(result);
          this.dataSource = new MatTableDataSource(this.familia);
          this.table.renderRows();
        });
      }

  openDialogCrear(): void {
    const dialogRef = this.dialog.open(FamiliaDialogComponent, {
      data: {familiaDialog: this.familia}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.familia = [];
      this.familias = result;
      
      if(this.familias){
        this.familia.push(this.familias)
        this.dataSource = new MatTableDataSource(this.familia);
        this.table.renderRows();
        this.familias = undefined;
      }

    });
  }

  eliminarEmpleado(famEliminar: Familia): void {
    this.familia = this.familia.filter(e => e.id !== famEliminar.id);
    this.dataSource = new MatTableDataSource(this.familia);
  }

buscarFamilia(){
  this.familiaService.filtrar(this.familiaBuscar,1,2).subscribe(response=>{
    if(response == null) {
      this.openSnackBar("No se encontró familia");
      return
    }
    this.data = response;
    console.log(response);
    this.data = response;
    this.dataSource = new MatTableDataSource(this.data.content);
    this.table.renderRows();
    this.openSnackBar("Búsqueda exitosa")
}, err => {
  this.openSnackBar("No se encontró familia")
})

}

onPaginateChange(event: PageEvent) {
  
  console.log(event.pageSize)
  let page: number = event.pageIndex + 1;
  console.log(page)
  let size = event.pageSize; 
  this.familiaService.filtrar(this.familiaBuscar,page+1,size).subscribe(response=>{
    console.log(response)
  this.data = response;
  this.dataSource = new MatTableDataSource(this.data.content);
  this.table.renderRows();

    })
    
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  openDialogEncuesta(familia: Familia) {
    const dialogRef = this.dialog.open(EncuestasFamiliaComponent, {
      data: {familia: familia}
    });
  }

  openDialogMiebrosDeFamilia(familia: Familia) {
    const dialogRef = this.dialog.open(MiembrosFamiliaComponent, {
      data: {familia: familia}
    });
  }

  openDialogCaracterisiticas() {
    const dialogRef = this.dialog.open(CaracteristicasFamiliaDialogComponent, {
      height: '600px',
      width: '90%'
    });
  }



}