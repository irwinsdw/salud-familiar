import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Familia } from 'src/app/core/models/familia';
import { FamiliaComponent } from '../../components/familia/familia.component';
import { FamiliaService } from '../../services/familia.service';
import { HistoriaFamiliarDialogComponent } from '../historia-familiar-dialog/historia-familiar-dialog.component';

@Component({
  selector: 'app-familia-dialog',
  templateUrl: './familia-dialog.component.html',
  styleUrls: ['./familia-dialog.component.css']
})
export class FamiliaDialogComponent implements OnInit {
  formFamilia: FormGroup = new FormGroup({});
  
  constructor(private familiaserviceApi:FamiliaService,public dialogRef: MatDialogRef<FamiliaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.data.familia){
      let familia: Familia = this.data.empleado;
     
      this.formFamilia = new FormGroup({
        nombre: new FormControl(familia.nombre, [
          Validators.required
        ]),
        telefono: new FormControl(familia.telefono,[
          Validators.required
        ]),
        zona: new FormControl(familia.zona,[
          Validators.required
        ]),
        nombrezona: new FormControl(familia.nombrezona,[
          Validators.required
        ]),
        tipovia: new FormControl(familia.tipovia,[
          Validators.required
        ]),
        nomtipovia: new FormControl(familia.nomtipovia,[
          Validators.required
        ]),
        referencia: new FormControl(familia.referencia,[
          Validators.required
        ])
      });
    }else {
      this.formFamilia = new FormGroup({
        nombre: new FormControl('', [
          Validators.required
        ]),
        celular: new FormControl('',[
          Validators.required
        ]),
        zona: new FormControl('',[
          Validators.required
        ]),
        nombrezona: new FormControl('',[
          Validators.required
        ]),
        tipovia: new FormControl('',[
          Validators.required
        ]),
        nomtipovia: new FormControl('',[
          Validators.required
        ]),
        referencia: new FormControl('',[
          Validators.required
        ])
      });
    }
  }

  

 




  registrar() {
    console.log('service.crear() => Succesfull');
    const dialogRef = this.dialog.open(HistoriaFamiliarDialogComponent, {
      data: {nombreFamilia: this.formFamilia.controls['nombre'].value} } ) ;
      this.familiaserviceApi.registrar({...this.formFamilia.value,empleado:{id:this.data.dataresult.data.id}}).subscribe(result => {
        console.log(result)
        alert("empleado agregado  con exito");
        // if(this.familia){
        //   this.familias.push(this.familia);
        //   this.table.renderRows();
        //   this.familia = undefined;
        // }
  
      });
      console.log('service.crear() => Succesfull');
    }

  actualizar() {
    console.log('service.actualizar() => Succesfull');
  }

  onNoClick(): void {
    this.dialogRef.close();

  }


}
