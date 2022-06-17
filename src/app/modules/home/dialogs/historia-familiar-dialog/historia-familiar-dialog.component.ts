import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoriaFamiliar } from 'src/app/core/models/historia-familiar';
import { IntegranteFamiliar } from 'src/app/core/models/integrante-familiar';
import { EstructuraFamiliarComponent } from '../../components/estructura-familiar/estructura-familiar.component';
import { HistoriaFamiliarComponent } from '../../components/historia-familiar/historia-familiar.component';
import { EstructuraFamiliarDialogComponent } from '../estructura-familiar-dialog/estructura-familiar-dialog.component';

@Component({
  selector: 'app-historia-familiar-dialog',
  templateUrl: './historia-familiar-dialog.component.html',
  styleUrls: ['./historia-familiar-dialog.component.css']
})
export class HistoriaFamiliarDialogComponent implements OnInit {
  formHistoriaFamiliar: FormGroup = new FormGroup({});

  casaEncuestada: boolean = false;

  numerosDeVisitasPresencial: string[] = ['1ra presencial','2da presencial','3ra presencial','4ta presencial','5ta presencial','6ta presencial'];

  constructor(public dialogRef: MatDialogRef<HistoriaFamiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog) { }

  ngOnInit(): void {

    

    if(this.data.historiaFamiliar){
      let historiaFamiliar: HistoriaFamiliar = this.data.historiaFamiliar;


      this.formHistoriaFamiliar = new FormGroup({
        familia: new FormControl(historiaFamiliar.familia.nombre, [
          Validators.required
        ]),
        numeroHistoria: new FormControl(historiaFamiliar.numeroHistoria,[
          Validators.required
        ]),
        subSector: new FormControl(historiaFamiliar.subSector,[
          Validators.required
        ]),
        condicionEncuesta: new FormControl(historiaFamiliar.condicionEncuesta,[
          Validators.required
        ]),
        observacion: new FormControl(historiaFamiliar.observacion,[
          
        ]),
        fechaApertura: new FormControl(historiaFamiliar.fechaApertura,[
          
        ]),
        numeroVisitaPresencial: new FormControl(historiaFamiliar.numeroVisitaPresencial,[
          
        ]),
        numeroVisitaRemota: new FormControl(historiaFamiliar.numeroVisitaRemota,[
          
        ])
      });
    }else {

      let nombreFamilia: string = '';
      if(this.data.nombreFamilia) {
        nombreFamilia = this.data.nombreFamilia;
      }

      this.formHistoriaFamiliar = new FormGroup({
        familia: new FormControl(nombreFamilia, [
          Validators.required
        ]),
        numeroHistoria: new FormControl('',[
          Validators.required
        ]),
        subSector: new FormControl('',[
          Validators.required
        ]),
        condicionEncuesta: new FormControl('',[
          Validators.required
        ]),
        observacion: new FormControl('',[
          
        ]),
        fechaApertura: new FormControl('',[
          
        ]),
        numeroVisitaPresencial: new FormControl('',[
          
        ]),
        numeroVisitaRemota: new FormControl('',[
          
        ])
      });
    }
  }

  
  registrar() {
    console.log('service.crear() => Succesfull');
    console.log('service.crear() => Succesfull');
    const dialogRef = this.dialog.open(EstructuraFamiliarDialogComponent, {
      data: {nombreFamilia: new IntegranteFamiliar()}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      // if(this.familia){
      //   this.familias.push(this.familia);
      //   this.table.renderRows();
      //   this.familia = undefined;
      // }

    });
  }

  actualizar() {
    console.log('service.actualizar() => Succesfull');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  condicionEncuesta(estado: boolean) {
    this.casaEncuestada = estado;
  }
}
