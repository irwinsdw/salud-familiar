import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { EstablecimientoComponent } from '../../components/establecimiento/establecimiento.component';
import { EstablecimientoService } from '../../services/establecimiento.service';

@Component({
  selector: 'app-establecimiento-dialog',
  templateUrl: './establecimiento-dialog.component.html',
  styleUrls: ['./establecimiento-dialog.component.css']
})
export class EstablecimientoDialogComponent implements OnInit {
  formEstablecimiento: FormGroup = new FormGroup({});
  constructor(private apiestablecimiento:EstablecimientoService, public dialogRef: MatDialogRef<EstablecimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}

  
  registrar() {


    if(this.formEstablecimiento.valid) {
      this.apiestablecimiento.registrar(this.formEstablecimiento.value)
      .subscribe({
       next: (result) =>{
         alert("establecimiento agregado con exito");
         this.formEstablecimiento.reset();
        
       },
       error: () =>{
         alert("error al crear el establecimiento")
       }
  
      })
    } 
    
   
  }

  actualizar() {
    console.log('service.actualizar() => Succesfull');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
