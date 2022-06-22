import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Encuesta } from 'src/app/core/models/encuesta';
import { Familia } from 'src/app/core/models/familia';
import { Persona } from 'src/app/core/models/persona';
import { HistoriaFamiliarComponent } from '../../components/historia-familiar/historia-familiar.component';
import { EncuestaService } from '../../services/encuesta.service';
import { EstructuraFamiliarDialogComponent } from '../estructura-familiar-dialog/estructura-familiar-dialog.component';

@Component({
  selector: 'app-historia-familiar-dialog',
  templateUrl: './historia-familiar-dialog.component.html',
  styleUrls: ['./historia-familiar-dialog.component.css']
})
export class HistoriaFamiliarDialogComponent implements OnInit {
  formEncuesta: FormGroup = new FormGroup({});

  casaEncuestada: boolean = false;
  radioButtonDeshabilitado: boolean = true;

  familia: Familia = new Familia();

  numerosDeVisitasPresencial: string[] = ['1ra presencial','2da presencial','3ra presencial','4ta presencial','5ta presencial','6ta presencial'];

  constructor(public dialogRef: MatDialogRef<HistoriaFamiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog, private encuestaService:EncuestaService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    

    if(this.data.familia){
      this.familia = this.data.familia;
      console.log(this.familia.id)

      this.formEncuesta = new FormGroup({
        familia: new FormControl({value:this.familia.nombre, disabled: true}, [
          Validators.required
        ]),
        condicionEncuesta: new FormControl('',[
          Validators.required
        ]),
        numeroVisita: new FormControl({value:'', disabled: true},[
          Validators.required
        ]),
        formaVisita: new FormControl({value:'', disabled: true},[
          Validators.required
        ]),
        fechaVisita: new FormControl({value:'', disabled: true},[
          Validators.required
        ]),
        observacion: new FormControl({value:'', disabled: true},[
          Validators.required
        ])
      });
    }else {

      let nombreFamilia: string = 'xd';
      if(this.data.encuesta) {
        nombreFamilia = this.data.encuesta.familia.nombre;
      }

      this.formEncuesta = new FormGroup({
        familia: new FormControl({value:nombreFamilia, disabled: true}, [
          Validators.required
        ]),
        condicionEncuesta: new FormControl('',[
          Validators.required
        ]),
        numeroVisita: new FormControl({value:'', disabled: true},[
          Validators.required
        ]),
        formaVisita: new FormControl({value:'', disabled: true},[
          Validators.required
        ]),
        fechaVisita: new FormControl({value:'', disabled: true},[
          Validators.required
        ]),
        observacion: new FormControl({value:'', disabled: true},[
          Validators.required
        ]),
      });
    }
  }

  
  registrar() {
    
    let encuesta: Encuesta = new Encuesta();
    
    encuesta = this.formEncuesta.value;
    let familiaNueva: Familia = new Familia();
    familiaNueva = this.familia
    encuesta.familia = familiaNueva
    console.log('Esta es la que pasa', encuesta)
    this.encuestaService.registrar(encuesta)
        .subscribe(response => {
          this.openSnackBar('Registro exitoso!')
          this.dialogRef.close();

          if(!this.casaEncuestada){
            return
          }
          const dialogRef = this.dialog.open(EstructuraFamiliarDialogComponent, {
            data: {familia: response.data.familia}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log(result)
      
          });
        }, err => {
          this.openSnackBar('No se pudo registrar la encuesta, vuelva a intentarlo')
        })


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange() {
    if(this.casaEncuestada) {
      this.formEncuesta.controls['numeroVisita'].enable()
      this.formEncuesta.controls['formaVisita'].enable()
      this.formEncuesta.controls['fechaVisita'].enable()
      this.formEncuesta.controls['observacion'].enable()
    }else{
      this.formEncuesta.controls['numeroVisita'].disable()
      this.formEncuesta.controls['formaVisita'].disable()
      this.formEncuesta.controls['fechaVisita'].disable()
      this.formEncuesta.controls['observacion'].disable()
    }
  }

  condicionEncuesta(estado: boolean) {
    this.casaEncuestada = estado;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
}
