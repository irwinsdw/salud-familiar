import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IntegranteFamiliar } from 'src/app/core/models/integrante-familiar';
import { EstructuraFamiliarComponent } from '../../components/estructura-familiar/estructura-familiar.component';

@Component({
  selector: 'app-estructura-familiar-dialog',
  templateUrl: './estructura-familiar-dialog.component.html',
  styleUrls: ['./estructura-familiar-dialog.component.css']
})
export class EstructuraFamiliarDialogComponent implements OnInit {

  formIntegranteFamiliar: FormGroup = new FormGroup({});
  clasificacionesSeleccionadas: FormArray =  new FormArray([]);

  seguros: string[] = ['SIS', 'ESSALUD','PRIMA'];
  
  clasifiacionesRiesgosas: any[] = [
    {nombre:'Gestante', estado: false},{nombre:'Hipertensión Arterial', estado: false},{nombre:'Discapacidad', estado: false},
    {nombre:'T.B.C', estado: false},{nombre:'Diabetes crónica', estado: false},{nombre:'Diabetes mellitus', estado: false},
    {nombre:'Niño < 5', estado: false},{nombre:'Dengue', estado: false},{nombre:'Mujer en edad fértil sin PPFF', estado: false},
    {nombre:'Mujer en edad fértil sin PAP', estado: false},{nombre:'Otros', estado: false},{nombre:'No refiere', estado: false},
  ]

  constructor(public dialogRef: MatDialogRef<EstructuraFamiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

     }

  ngOnInit(): void {
    if(this.data.integranteFamiliar){
      let integranteFamiliar: IntegranteFamiliar = this.data.integranteFamiliar;
      
      if(integranteFamiliar.clasificacionRiesgo.length > 0){
        integranteFamiliar.clasificacionRiesgo.forEach(c => {
          this.clasifiacionesRiesgosas.forEach(c2 => {
            if(c == c2.nombre) c2.estado = true; return
          })
        })
      }

      

      this.formIntegranteFamiliar = new FormGroup({
        nombreApellidos: new FormControl(integranteFamiliar.nombreApellidos, [
          Validators.required
        ]),
        parentesco: new FormControl(integranteFamiliar.parentesco,[
          Validators.required
        ]),
        estadoCivil: new FormControl(integranteFamiliar.estadoCivil,[
          Validators.required
        ]),
        seguroMedico: new FormControl(integranteFamiliar.seguroMedico,[
          Validators.required
        ]),
        fechaNacimiento: new FormControl(integranteFamiliar.fechaNacimiento,[
          Validators.required
        ]),
        dni: new FormControl(integranteFamiliar.dni,[
          Validators.required
        ]),
        sexo: new FormControl(integranteFamiliar.sexo,[
          Validators.required
        ]),
        gradoInstruccion: new FormControl(integranteFamiliar.gradoInstruccion,[
          Validators.required
        ]),
        ocupacion: new FormControl(integranteFamiliar.ocupacion,[
          Validators.required
        ])
        ,
        clasificacionRiesgo: new FormArray([])
        ,
        gestante: new FormControl(integranteFamiliar.gestante,[
          Validators.required
        ]),
        idioma: new FormControl(integranteFamiliar.idioma,[
          Validators.required
        ]),
        religion: new FormControl(integranteFamiliar.religion,[
          Validators.required
        ]),
        pertenenciaEtnica: new FormControl(integranteFamiliar.pertenenciaEtnica,[
          Validators.required
        ])
      });
    }else {
      this.formIntegranteFamiliar = new FormGroup({
        nombreApellidos: new FormControl('', [
          Validators.required
        ]),
        parentesco: new FormControl('',[
          Validators.required
        ]),
        estadoCivil: new FormControl('',[
          Validators.required
        ]),
        seguroMedico: new FormControl('',[
          Validators.required
        ]),
        fechaNacimiento: new FormControl('',[
          Validators.required
        ]),
        dni: new FormControl('',[
          Validators.required
        ]),
        sexo: new FormControl('',[
          Validators.required
        ]),
        gradoInstruccion: new FormControl('',[
          Validators.required
        ]),
        ocupacion: new FormControl('',[
          Validators.required
        ]),
        clasificacionRiesgo: new FormArray([])
        ,
        gestante: new FormControl('',[
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
    const clasificacionesSeleccionadas = (this.formIntegranteFamiliar.controls['clasificacionRiesgo'] as FormArray);
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
    console.log('service.crear() => Succesfull');
  }

  actualizar() {
    console.log('service.actualizar() => Succesfull');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
