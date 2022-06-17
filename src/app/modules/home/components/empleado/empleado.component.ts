import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { distrito } from 'src/app/core/models/distrito';
import { empleado } from 'src/app/core/models/empleado';
import { EmpleadoDialogComponent } from '../../dialogs/empleado-dialog/empleado-dialog.component';
import { EmpleadoService } from '../../services/empleado.service';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  pageEvent!: PageEvent;
 
  empleados!: empleado | undefined;
  empleado : empleado[] = [];
  distrito : distrito[] = [];
  empleadobuscar:string = '';
  data:any;


  
    //OBTENER LOS empleados DEL BACKEND por el SERVICE 
    
  

  displayedColumns: string[] = ['dni','nombre','establecimiento','microred','Acciones'];

  dataSource: MatTableDataSource<empleado> = new MatTableDataSource(this.empleado);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog,private empleadoservice:EmpleadoService) { 
    let nombreempleado: string[] = [];
    this.empleado.forEach(e => nombreempleado.push(e.establecimiento.nombre));
    
  }

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

  }

  


      

     

  openDialogActualizar(empleado: empleado): void {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      data: {empleado: empleado}
      

    });

    dialogRef.afterClosed().subscribe(result => {
      empleado = result;
      this.table.renderRows();
    });
  }






  
  openDialogCrear(): void {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      data: {empleadol: this.empleados}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.empleados = result;
      if(this.empleados){
        this.empleado.push(this.empleados);
        this.table.renderRows();
        this.empleados = undefined;
      }

    });
  }

  eliminarEmpleado(empleado: empleado): void {
    this.empleado = this.empleado.filter(e => e.id !== empleado.id);
    this.dataSource = new MatTableDataSource(this.empleado);
  }

buscarempleado(){
  this.empleadoservice.buscar(this.empleadobuscar).subscribe(response=>{
    this.data = response;
    console.log(this.data);
    let empleado: empleado = this.data.content;
    console.log(empleado)
    let empleadosEncontrado : empleado[]= []
    empleadosEncontrado.push(this.data.data)
    console.log(empleadosEncontrado)
    this.dataSource = new MatTableDataSource(empleadosEncontrado);
    this.table.renderRows();
})

}

onPaginateChange(event: PageEvent) {
  
  console.log(event.pageSize)
  let page: number = event.pageIndex;
  console.log(page)
  let size = event.pageSize; 
  this.empleadoservice.paginar(1,1).subscribe(response=>{
    console.log(response)
  this.data = response;
  this.dataSource = new MatTableDataSource(this.data.content);
  this.table.renderRows();

    })
    

  }


}
