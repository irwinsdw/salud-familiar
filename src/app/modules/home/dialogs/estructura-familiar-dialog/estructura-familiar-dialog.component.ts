import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClasificacionRiesgo } from 'src/app/core/models/clasificacion-riesgo';
import { Familia } from 'src/app/core/models/familia';
import { Persona } from 'src/app/core/models/persona';
import { EstructuraFamiliarComponent } from '../../components/estructura-familiar/estructura-familiar.component';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-estructura-familiar-dialog',
  templateUrl: './estructura-familiar-dialog.component.html',
  styleUrls: ['./estructura-familiar-dialog.component.css']
})
export class EstructuraFamiliarDialogComponent implements OnInit {

  formPersona: FormGroup = new FormGroup({});
  clasificacionesSeleccionadas: FormArray =  new FormArray([]);
  empleadoControlForm: FormControl = new FormControl();
  religiones:string[]=['CATOLICO','EVANGELICO','OTROS'];
  etnias:string[]=['MESTIZO','SHIPIBO-KONIBO','ASHANINKA','AYMARA','BLANCO','OTROS'];
  seguros: string[] = ['SIS', 'ESSALUD','PRIMA','FAA','POLICIA NACIONAL','PRIVADO','SIN SEGURO'];
  estado_civil:string[]=['SOLTERO','CASADO','DIVORCIADO/A','VIUDO/A','CONVIVIENTE'];
  grado_instruccion:string[]=['INICIAL','PRIMARIA COMPLETA','SECUNDARIA COMPLETA','PRIMARIA INCOMPLETA','SECUNDARIA INCOMPLETA','SUPERIOR UNIVERSITARIO COMPLETO'
  ,'SUPERIOR UNIVERSITARIO INCOMPLETO','SUPERIOR TECNICO COMPLETO','SUPERIOR TECNICO INCOMPLETO'];
  idiomas:string[]=['CASTELLANO','SHIPIBO-KONIBO','ASHANINKA','OTROS']
  listaClasificacionRiesgo: ClasificacionRiesgo[] = []

  listaClasificacionSeleccionado: any[] = []; 

  constructor(public dialogRef: MatDialogRef<EstructuraFamiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private personaService: PersonaService, private _snackBar: MatSnackBar) {

     }

  ngOnInit(): void {

    if(this.data.persona){
      let persona: Persona = this.data.persona;

      this.empleadoControlForm = new FormControl(this.data.persona.familia.nombre)
      this.listaClasificacionSeleccionado = persona.riesgospersonas
      
      this.formPersona = new FormGroup({
        nombreCompleto: new FormControl(persona.nombreCompleto, [
          Validators.required
        ]),
        parentesco: new FormControl(persona.parentesco,[
          Validators.required
        ]),
        estadoCivil: new FormControl(persona.estadoCivil,[
          Validators.required
        ]),
        seguro: new FormControl(persona.seguro,[
          Validators.required
        ]),
        fechaNacimiento: new FormControl(persona.fechaNacimiento,[
          Validators.required
        ]),
        dni: new FormControl(persona.dni,[
          Validators.required
        ]),
        genero: new FormControl(persona.genero,[
          Validators.required
        ]),
        estudios: new FormControl(persona.estudios,[
          Validators.required
        ]),
        ocupacion: new FormControl(persona.ocupacion,[
          Validators.required
        ]),
        idioma: new FormControl(persona.idioma,[
          Validators.required
        ]),
        religion: new FormControl(persona.religion,[
          Validators.required
        ]),
        pertenenciaEtnica: new FormControl(persona.pertenenciaEtnica,[
          Validators.required
        ]),
        
      });

      this.personaService.listaClasificacionRiesgo()
      .subscribe(response => {
        this.listaClasificacionRiesgo = response;

        this.listaClasificacionRiesgo.forEach(c => {
          persona.riesgospersonas.forEach(r => {
            if(c.id == r.id) {
              c.estado = true;
            }
          })
        })

       
        
      })


      
    }else {
      this.personaService.listaClasificacionRiesgo()
      .subscribe(response => this.listaClasificacionRiesgo = response)
      this.empleadoControlForm = new FormControl(this.data.familia.nombre)
      this.formPersona = new FormGroup({
        nombreCompleto: new FormControl('', [
          Validators.required
        ]),
        parentesco: new FormControl('',[
          Validators.required
        ]),
        estadoCivil: new FormControl('',[
          Validators.required
        ]),
        seguro: new FormControl('',[
          Validators.required
        ]),
        fechaNacimiento: new FormControl('',[
          Validators.required
        ]),
        dni: new FormControl('',[
          Validators.required
        ]),
        genero: new FormControl('',[
          Validators.required
        ]),
        estudios: new FormControl('',[
          Validators.required
        ]),
        ocupacion: new FormControl('',[
          Validators.required
        ]),
        idioma: new FormControl('',[
          Validators.required
        ]),
        religion: new FormControl('',[
          Validators.required
        ]),
        pertenenciaEtnica: new FormControl('',[
          Validators.required
        ])
      });
    }
  }

  onCheckboxChange(event: any) {
    if (event.checked) {
      let clasificacionSeleccionada = new ClasificacionRiesgo();
      clasificacionSeleccionada.id = +event.source.value;
      this.listaClasificacionSeleccionado.push({id: +event.source.value})
      
    } else {
      this.listaClasificacionSeleccionado = this.listaClasificacionSeleccionado.filter(c => c.id != +event.source.value)
    }

  }

    
  registrar() {
    let persona: Persona = this.formPersona.value;
    let familia: Familia = new Familia();

    if(this.data.persona){
      persona.id = this.data.persona.id;
    }

    if(this.data.familia) {
      familia.id = this.data.familia.id
    }else {
      familia = this.data.persona.familia;
    }

    persona.familia = familia;
    persona.riesgospersonas = this.listaClasificacionSeleccionado
    this.personaService.registrar(this.formPersona.value)
        .subscribe(response => {
          if(persona.id) {
            this.openSnackBar('Actualización exitosa')
            this.dialogRef.close(response.data);
            return
          }
          this.dialogRef.close(response.data);
          this.openSnackBar(response.message)
        }, err => {
          this.openSnackBar('Ocurrió un error, probar nuevamente')
        })
  }

  registrarMasPersonas() {
    let persona: Persona = this.formPersona.value;
    let familia: Familia = new Familia();

    if(this.data.persona){
      persona.id = this.data.persona.id;
    }

    if(this.data.familia) {
      familia.id = this.data.familia.id
    }else {
      familia = this.data.persona.familia;
    }

    persona.familia = familia;
    this.personaService.registrar(this.formPersona.value)
        .subscribe(response => {
          if(!this.data.familia) {
            this.openSnackBar('Actualización exitosa')
            this.dialogRef.close(response.data);
          }
          this.openSnackBar(response.message)
          
          this.formPersona.reset();
        }, err => {
          this.openSnackBar('Ocurrió un error, probar nuevamente')
        })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

}
