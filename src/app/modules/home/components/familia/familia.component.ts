import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Familia } from 'src/app/core/models/familia';
import { FamiliaDialogComponent } from '../../dialogs/familia-dialog/familia-dialog.component';
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
    
  

  displayedColumns: string[] = ['numero_historia','nombre','telefono','empleado','Acciones'];

  dataSource: MatTableDataSource<Familia> = new MatTableDataSource(this.familia);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog,private familiaService:FamiliaService) { 
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
    
        // if (this.dataSource.paginator) {
        //   this.dataSource.paginator.firstPage();
        // }
      }

      openDialogActualizar(familia: Familia): void {
        const dialogRef = this.dialog.open(FamiliaDialogComponent, {
          data: {familia: familia}
          
    
        });
    
        dialogRef.afterClosed().subscribe(result => {
          familia = result;
          this.table.renderRows();
        });
      }

  openDialogCrear(): void {
    const dialogRef = this.dialog.open(FamiliaDialogComponent, {
      data: {familiaDialog: this.familia}
    });





    
    dialogRef.afterClosed().subscribe(result => {
      this.familias = result;
      if(this.familias){
        this.familia.push(this.familias);
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
    this.data = response;
    console.log(response);
    this.data = response;
    this.dataSource = new MatTableDataSource(this.data.content);
    this.table.renderRows();
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


}

