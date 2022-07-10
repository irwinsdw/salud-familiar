import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  seguros: string[] = ['SIS', 'ESSALUD','PRIMA','FAA','POLICIA NACIONAL','PRIVADO','SIN SEGURO'];
  
  clasifiacionesRiesgosas: any[] = [
    {nombre:'Gestante', estado: false},{nombre:'Hipertensión Arterial', estado: false},{nombre:'Discapacidad', estado: false},
    {nombre:'T.B.C', estado: false},{nombre:'Diabetes crónica', estado: false},{nombre:'Diabetes mellitus', estado: false},
    {nombre:'Niño < 5 sin cred/sin vacuna', estado: false},{nombre:'Dengue', estado: false},{nombre:'Mujer en edad fértil sin PPFF', estado: false},
    {nombre:'Mujer en edad fértil sin PAP', estado: false},{nombre:'Otros', estado: false},{nombre:'No refiere', estado: false},
  ]

  constructor(public dialogRef: MatDialogRef<EstructuraFamiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private personaService: PersonaService, private _snackBar: MatSnackBar) {

     }

  ngOnInit(): void {
    if(this.data.persona){
      let persona: Persona = this.data.persona;
      this.empleadoControlForm = new FormControl(this.data.persona.familia.nombre)
      if(persona.clasificacionRiesgo.length > 0){
        // persona.clasificacionRiesgo.forEach(c => {
        //   this.clasifiacionesRiesgosas.forEach(c2 => {
        //     if(c == c2.nombre) c2.estado = true; return
        //   })
        // })
      }

      

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
        ])
        ,
        clasificacionRiesgo: new FormArray([])
        ,
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
    }else {
      console.log(this.data)
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
        clasificacionRiesgo: new FormArray([])
        ,
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
    const clasificacionesSeleccionadas = (this.formPersona.controls['clasificacionRiesgo'] as FormArray);
    console.log(event)
    if (event.checked) {
      clasificacionesSeleccionadas.push(new FormControl(event.source.value));
      
    } else {
      const index = clasificacionesSeleccionadas.controls
      .findIndex(x => x.value === event.source.value);
      clasificacionesSeleccionadas.removeAt(index);
    }
    console.log(clasificacionesSeleccionadas.value)
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
    persona.clasificacionRiesgo = 'PRUEBA'
    this.personaService.registrar(this.formPersona.value)
        .subscribe(response => {
          if(!this.data.familia) {
            this.openSnackBar('Actualización exitosa')
            this.dialogRef.close(response.data);
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
    persona.clasificacionRiesgo = 'PRUEBA'
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
