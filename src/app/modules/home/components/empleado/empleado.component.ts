import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
 
  empleado!: empleado | undefined;
  empleados : empleado[] = [];
  distrito : distrito[] = [];
  empleadobuscar:string = '';
  data:any;

  displayedColumns: string[] = ['dni','nombre','establecimiento','microred','Acciones'];

  dataSource: MatTableDataSource<empleado> = new MatTableDataSource(this.empleados);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog,private empleadoservice:EmpleadoService, private _snackBar: MatSnackBar) { 
    let nombreempleado: string[] = [];
    this.empleados.forEach(e => nombreempleado.push(e.establecimiento.nombre));
    
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
      if(result == undefined) {
        return
      }
      let empleadosEncontrado : empleado[]= []
      empleadosEncontrado.push(result)
      this.dataSource = new MatTableDataSource(empleadosEncontrado);
      this.table.renderRows();
    });
  }

  openDialogCrear(): void {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      data: {empleadol: this.empleado}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.empleado = result;
      if(this.empleado){
        this.empleados.push(this.empleado);
        this.table.renderRows();
        this.empleado = undefined;
      }

    });
  }

  eliminarEmpleado(empleado: empleado): void {
    this.empleados = this.empleados.filter(e => e.id !== empleado.id);
    this.dataSource = new MatTableDataSource(this.empleados);
  }

  buscarempleado(){
    this.empleadoservice.buscar(this.empleadobuscar).subscribe(response=>{
      this.data = response;
      console.log(this.data);
      let empleadosEncontrado : empleado[]= []
      empleadosEncontrado.push(this.data.data)
      this.dataSource = new MatTableDataSource(empleadosEncontrado);
      this.table.renderRows();
      this.openSnackBar(response.message)
    }, err => {
      this.openSnackBar(err.error.message)
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  onPaginateChange(event: PageEvent) {
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
