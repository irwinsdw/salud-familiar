import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { empleado } from 'src/app/core/models/empleado';
import { EmpleadoComponent } from '../../components/empleado/empleado.component';
import { EmpleadoVOService } from '../../services/empleado-vo.service';
import { EmpleadoService } from '../../services/empleado.service';
import { FamiliaDialogComponent } from '../familia-dialog/familia-dialog.component';
@Component({
  selector: 'app-empleado-dialog',
  templateUrl: './empleado-dialog.component.html',
  styleUrls: ['./empleado-dialog.component.css']
})
export class EmpleadoDialogComponent implements OnInit {
  
 
  empleado: empleado = new empleado();
  EmpleadoEncontrado: empleado = new empleado();
  formEmpleado: FormGroup = new FormGroup({});
  constructor(private empleadoapi:EmpleadoService,public dialogRef: MatDialogRef<EmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , public dialog: MatDialog) { }
    

  ngOnInit(): void {
    if(this.data.empleado){
      let empleado = this.data.empleado;
      this.formEmpleado = new FormGroup({
        dni: new FormControl(empleado.dni, [
          Validators.required
        ]),
        nombre: new FormControl(empleado.nombre,[
          Validators.required
        ]),
        establecimiento: new FormControl(empleado.establecimiento.nombre,[
          Validators.required
        ]),
        microred: new FormControl(empleado.establecimiento.microred.nombre,[
          Validators.required
        ]),
      
        redsalud: new FormControl(empleado.establecimiento.microred.redsalud.nombre,[
        Validators.required
      ]),
      distrito: new FormControl(empleado.distrito.nombre,[
        Validators.required
      ]),
      provincia: new FormControl(empleado.distrito.provincia.nombre,[
        Validators.required
      ])
    });
    }else {
      this.formEmpleado = new FormGroup({
        dni: new FormControl('', [
          Validators.required
        ]),
        nombre: new FormControl('',[
          Validators.required
        ]),
       
        establecimiento: new FormControl('',[
          Validators.required
        ]),
        microred: new FormControl('',[
          Validators.required
        ]),
        redsalud: new FormControl('',[
          Validators.required
        ]),
      
      distrito: new FormControl('',[
        Validators.required
      ]),

      provincia: new FormControl('',[
        Validators.required
      ]),
      });
    }
  }

  
  registrar(formEmpleado: any) {
    
    console.log(this.formEmpleado.value)
    let empleadonuevo : empleado = new empleado();
    empleadonuevo.dni=this.formEmpleado.controls['dni'].value
    empleadonuevo.nombre=this.formEmpleado.controls['nombre'].value
    empleadonuevo.establecimiento=this.empleado.establecimiento
    empleadonuevo.distrito=this.empleado.distrito
    empleadonuevo.id=this.empleado.id
    this.empleadoapi.registrar(empleadonuevo).subscribe(result => {
      console.log(result)
      const dialogRef = this.dialog.open(FamiliaDialogComponent, {
        data: {empleado: formEmpleado } 
//probando al modificar en github
        
      });
      alert("empleado agregado  con exito");
      // if(this.familia){
      //   this.familias.push(this.familia);
      //   this.table.renderRows();
      //   this.familia = undefined;
      //}

    });
    console.log('service.crear() => Succesfull');
  }

  actualizar() {
    console.log('service.actualizar() => Succesfull');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  buscarempleado(){
    let dniEmpleado: string = this.formEmpleado.controls['dni'].value
    this.empleadoapi.buscar(dniEmpleado).subscribe(response=>{
      this.data = response;
      console.log(this.data);
      this.empleado = this.data.data;
      console.log(this.empleado)

      
      this.formEmpleado = new FormGroup({
        dni: new FormControl(this.empleado.dni, [
          Validators.required
        ]),
        nombre: new FormControl(this.empleado.nombre,[
          Validators.required
        ]),
        establecimiento: new FormControl(this.empleado.establecimiento.nombre,[
          Validators.required
        ]),
      
      microred: new FormControl(this.empleado.establecimiento.microred.nombre,[
        Validators.required
      ]),
      
      redsalud: new FormControl(this.empleado.establecimiento.microred.redsalud.nombre,[
        Validators.required
      ]),
      distrito: new FormControl(this.empleado.distrito.nombre,[
        Validators.required
      ]),
      provincia: new FormControl(this.empleado.distrito.provincia.nombre,[
        Validators.required
      ]),
      });
  })
}

}