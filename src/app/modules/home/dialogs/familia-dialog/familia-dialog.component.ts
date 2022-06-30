import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { empleado} from 'src/app/core/models/empleado';
import { Familia } from 'src/app/core/models/familia';
import { FamiliaComponent } from '../../components/familia/familia.component';
import { EmpleadoService } from '../../services/empleado.service';
import { FamiliaService } from '../../services/familia.service';

@Component({
  selector: 'app-familia-dialog',
  templateUrl: './familia-dialog.component.html',
  styleUrls: ['./familia-dialog.component.css']
})
export class FamiliaDialogComponent implements OnInit {
  formFamilia: FormGroup = new FormGroup({});
  empleadoInputDeshabilitado: boolean = false;

  empleados: empleado[] = [];
  empleadosFiltrados!: Observable<any[]>;
  empleadoControl = new FormControl('',[Validators.required]); 
  mostrarAutocomplete: boolean = false;

  aHUrbHu: string[] = ['AH','URB','HU']
  aVCalleJironPasaje: string[] = ['Avenida','Calle','Jiron','Pasaje']
  
  constructor(private familiaserviceApi:FamiliaService, private empleadoService: EmpleadoService,public dialogRef: MatDialogRef<FamiliaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.empleadoService.listarEmpleados()
    .subscribe(response => {
      this.empleados = response;
      this.empleadosFiltrados = this.obtenerValoresFormControl(this.empleadoControl, this.empleados);
      
    })

    if(this.data.familia){
      let familia: Familia = this.data.familia
      
      this.empleadoControl = new FormControl(familia.titular)
      this.empleadoInputDeshabilitado = false;
      this.formFamilia = new FormGroup({
        numeroHistoria: new FormControl(familia.numeroHistoria, [ //numeroHistoria es de la parte private string
          Validators.required
        ]),
      
        nombre: new FormControl(familia.nombre, [
          Validators.required
        ]),
        telefono: new FormControl(familia.telefono, [
          Validators.required
        ]),
        asentamientoHumano: new FormControl(familia.asentamientoHumano, [
          Validators.required
        ]),
        avcalle_jiron_pasaje: new FormControl(familia.avcalle_jiron_pasaje, [
          Validators.required
        ]),
        ahurb_hu: new FormControl(familia.ahurb_hu, [
          Validators.required
        ]),
        lote: new FormControl(familia.lote, [
          Validators.required
        ]),
        manzana: new FormControl(familia.manzana, [
          Validators.required
        ]),
        subSector: new FormControl(familia.subSector, [
          Validators.required
        ]),
        fechaCreacion: new FormControl(familia.fechaCreacion, [
          Validators.required
        ]),
        referencia: new FormControl(familia.referencia, [
          Validators.required
        ]),
        titular: new FormControl(familia.titular, [
          Validators.required
        ]),
      });
    }else if (this.data.empleado){
      this.empleadoInputDeshabilitado = true;
      this.formFamilia = new FormGroup({
        numeroHistoria: new FormControl('', [
          Validators.required
        ]),
        nombre: new FormControl('',[
          Validators.required
        ]),
        telefono: new FormControl('', [
          Validators.required
        ]),
        asentamientoHumano: new FormControl('', [
          Validators.required
        ]),
        avcalle_jiron_pasaje: new FormControl('', [
          Validators.required
        ]),
        ahurb_hu: new FormControl('', [
          Validators.required
        ]),
        lote: new FormControl('', [
          Validators.required
        ]),
        manzana: new FormControl('', [
          Validators.required
        ]),
        subSector: new FormControl('', [
          Validators.required
        ]),
        fechaCreacion: new FormControl('', [
          Validators.required
        ]),
        referencia: new FormControl('', [
          Validators.required
        ]),
        titular: new FormControl({value: this.data.empleado.nombre, disabled: true}),
    });
    } else {
      this.empleadoInputDeshabilitado = false;
      this.formFamilia = new FormGroup({
        numeroHistoria: new FormControl('', [
          Validators.required
        ]),
        nombre: new FormControl('',[
          Validators.required
        ]),
        telefono: new FormControl('', [
          Validators.required
        ]),
        asentamientoHumano: new FormControl('', [
          Validators.required
        ]),
        avcalle_jiron_pasaje: new FormControl('', [
          Validators.required
        ]),
        ahurb_hu: new FormControl('', [
          Validators.required
        ]),
        lote: new FormControl('', [
          Validators.required
        ]),
        manzana: new FormControl('', [
          Validators.required
        ]),
        subSector: new FormControl('', [
          Validators.required
        ]),
        fechaCreacion: new FormControl('', [
          Validators.required
        ]),
        referencia: new FormControl('', [
          Validators.required
        ]),
        titular: this.empleadoControl,
    });
    }
  }

  registrar() {
    let familia: Familia = this.formFamilia.value;
    if(this.data.empleado) {
      familia.titular = this.data.empleado
    }
    this.familiaserviceApi.registrar(familia)
        .subscribe(result => {
      this.dialogRef.close(result.data)
      this.openSnackBar(result.message)
    }, err => {
      this.openSnackBar('Complete correctamene los campos')
    });



    }

  actualizar() {
    let familia: Familia = this.formFamilia.value;
    familia.id = this.data.familia.id;
    familia.titular = this.empleadoControl.value;
    this.familiaserviceApi.registrar(familia)
        .subscribe(result => {
          this.dialogRef.close(familia);
          this.openSnackBar('Familia actualizada')
    }, err => {
      this.openSnackBar('Complete correctamene los campos')
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayFn(objeto: any): string {
    return objeto && objeto.nombre ? objeto.nombre : '';
  }

    //obtiene los valores de los controles del formulario
  //como iteramos objetos con el "map" convertimos a string y luego filtramos por lo que vamos escribiendo
  obtenerValoresFormControl(objetoControl: FormControl, listaObjeto: any[]): Observable<any[]>{
    this.mostrarAutocomplete = false;
    return objetoControl.valueChanges
      .pipe(
        map(value => (typeof value === 'string' ? value : value?.nombre)),
        map(name => (name ? this._filter(name, listaObjeto) : listaObjeto.slice())),
      )
  }

  private _filter(nombre: string, listaObjeto: any[]): any[] {
    //si es menor a 3 letras no se ejecuta el filtrado y no se muestra el autocomplete
    if(nombre.length < 3) {
      this.mostrarAutocomplete = false;
      let listaObjetoAux:any[] = [];
      return listaObjetoAux;
    }

    this.mostrarAutocomplete = true;
    const filterValue = nombre.toLowerCase();

    return listaObjeto.filter(obj => obj.nombre.toLowerCase().includes(filterValue));
  }



}
