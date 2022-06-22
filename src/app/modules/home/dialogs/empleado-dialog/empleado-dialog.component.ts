import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { empleado } from 'src/app/core/models/empleado';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { EmpleadoComponent } from '../../components/empleado/empleado.component';
import { EmpleadoService } from '../../services/empleado.service';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { FamiliaDialogComponent } from '../familia-dialog/familia-dialog.component';
import {map, startWith} from 'rxjs/operators';
import { microred } from 'src/app/core/models/microred';
import { redsalud } from 'src/app/core/models/redsalud';
import { provincia } from 'src/app/core/models/provincia';
import { distrito } from 'src/app/core/models/distrito';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empleado-dialog',
  templateUrl: './empleado-dialog.component.html',
  styleUrls: ['./empleado-dialog.component.css']
})
export class EmpleadoDialogComponent implements OnInit {
  
 
  empleado: empleado = new empleado();
  EmpleadoEncontrado: empleado = new empleado();
  formEmpleado: FormGroup = new FormGroup({});


  mostrarAutocomplete: boolean = false;
  idRedSaludAuxiliar: number = 0;
  idMicroRedAuxiliar: number = 0;
  idProvinciaAuxiliar: number = 0;

  //autocomplete establecimiento
  establecimientos: Establecimiento[] = [];
  establecimientosFiltrados!: Observable<any[]>;
  establecimientoControl = new FormControl('',[Validators.required]); 

  //autocomplete microRed
  microRedes: microred[] = [];
  microRedesFiltrados!: Observable<any[]>;
  microRedControl = new FormControl('',[Validators.required]); 

  //autocomplete microRed
  redesSalud: redsalud[] = [];
  redesSaludFiltrados!: Observable<any[]>;
  redesSaludControl = new FormControl('',[Validators.required]);
  
  //autocomplete provincias
  provincias: provincia[] = [];
  provinciasFiltradas!: Observable<any[]>;
  provinciaControl = new FormControl('',[Validators.required]); 
  
  //autocomplete distritos
  distritosFiltradas!: Observable<any[]>;
  distritoControl = new FormControl('',[Validators.required]); 

  empleadoEncontrado: boolean = false;

  redSaludEncontrada: redsalud = new redsalud();
  microRedEncontrado: microred = new microred();
  pronvincia: provincia = new provincia();
  provinciaEncontrada: provincia = new provincia();

  constructor(private empleadoapi:EmpleadoService, private establecimientoService: EstablecimientoService,public dialogRef: MatDialogRef<EmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , public dialog: MatDialog, private _snackBar: MatSnackBar) { }
    

  ngOnInit(): void {

    //Código que se ejecuta cuando se va a actualizar un empleado
    if(this.data.empleado){
      let empleado: empleado = this.data.empleado;
      this.empleadoEncontrado = true;

      this.idRedSaludAuxiliar = empleado.establecimiento.microred.redsalud.id
      this.idMicroRedAuxiliar = empleado.establecimiento.microred.id
      this.idProvinciaAuxiliar = empleado.distrito.provincia.id;

      //cargos los controles del formulario con la data del empleado
      this.redesSaludControl = new FormControl(empleado.establecimiento.microred.redsalud);
      this.microRedControl = new FormControl(empleado.establecimiento.microred);
      this.establecimientoControl = new FormControl(empleado.establecimiento);
      this.distritoControl = new FormControl(empleado.distrito);
      this.provinciaControl = new FormControl(empleado.distrito.provincia);

      this.formEmpleado = new FormGroup({
        dni: new FormControl(empleado.dni, [
          Validators.required
        ]),
        nombre: new FormControl(empleado.nombre,[
          Validators.required
        ]),

        //asigno los controles con data del empleada al del formulario
        establecimiento: this.establecimientoControl,
        microred: this.microRedControl,
        redsalud: this.redesSaludControl,
        distrito: this.distritoControl,
        provincia: this.provinciaControl,
    });

    //Código que se ejecuta cuando se va a crear un nuevo empleado
    }else {
      this.formEmpleado = new FormGroup({
        dni: new FormControl('', [
          Validators.required,
        ]),
        nombre: new FormControl('',[
          Validators.required
        ]),

        //asigno los controles con data del empleada al del formulario
        establecimiento: this.establecimientoControl,
        microred: this.microRedControl,
        redsalud: this.redesSaludControl,
        distrito: this.distritoControl,
        provincia: this.provinciaControl,
      });
    }
    

    //me subscribo a 2 obserbables para obtener las redes de salud y las provincias
    //Cada redsalud tiene una lista de microred y cada microred tiene una lista de establecimientos
    //de esta manera cuando se seleccione una redsalud solo se mostrará las microred relacionadas a él.
    //Lo mismo con pronvincias, solo se mostrará los distritos relacionados al seleccionado
    this.establecimientoService.listarRedesSalud().subscribe(res => {

      this.redesSalud = res;
      this.redesSaludFiltrados = this.obtenerValoresFormControl(this.redesSaludControl, this.redesSalud);

      this.establecimientoService.listarProvincias()
      .subscribe(res =>{
        this.provincias = res;
        this.provinciasFiltradas = this.obtenerValoresFormControl(this.provinciaControl, this.provincias);

        //se ejecuta solo si va actualizar al empleado
        if(this.empleadoEncontrado) {

          //usando el método buscarObjeto para obtener un objeto en específico
          //se hace la búsqueda con una lista y el ID de un objeto para encontrada la data de los autocomplete
          this.redSaludEncontrada = this.buscarObjeto(this.redesSalud, this.data.empleado.establecimiento.microred.redsalud.id);
          this.microRedesFiltrados = this.obtenerValoresFormControl(this.microRedControl, this.redSaludEncontrada.microRedes);

          this.microRedEncontrado = this.buscarObjeto(this.redSaludEncontrada.microRedes, this.data.empleado.establecimiento.microred.id);
          this.establecimientosFiltrados = this.obtenerValoresFormControl(this.establecimientoControl, this.microRedEncontrado.establecimientos)

          this.provinciaEncontrada = this.buscarObjeto(this.provincias, this.data.empleado.distrito.provincia.id);
          this.distritosFiltradas = this.obtenerValoresFormControl(this.distritoControl, this.provinciaEncontrada.distritos)
        }
       });
    })
  }

  private buscarObjeto(listaObjetos: any[], idObjeto: number): any {
    let objetoEncontrado = new Object();
    listaObjetos.forEach(obj => {
      if(obj.id == idObjeto) {
        objetoEncontrado = obj;
      }
    })
    return objetoEncontrado;
  }

  //método que escucha si hay algún cambio en el autocomplete
  onChangeRedesSalud() {
    //validamos si es un empleado para actualizar y si el id redSalud es diferente al del empleado 
    if(this.idRedSaludAuxiliar != 0 && this.idRedSaludAuxiliar != this.redesSaludControl.value.id) {
      this.microRedControl = new FormControl('',[Validators.required]);
      this.establecimientoControl = new FormControl('',[Validators.required]);
    }
    this.idRedSaludAuxiliar = this.redesSaludControl.value.id;

    if(this.redesSaludControl.value) {
      let redSaludSeleccionada: redsalud = this.redesSaludControl.value;
      this.microRedes = redSaludSeleccionada.microRedes;
      this.microRedesFiltrados = this.obtenerValoresFormControl(this.microRedControl, this.microRedes);
    }
  }

 //método que escucha si hay algún cambio en el autocomplete
  onChangeMicroRedes() {

    //validamos si es un empleado para actualizar y si el id redSalud es diferente al del empleado 
    if(this.idMicroRedAuxiliar != 0 && this.idMicroRedAuxiliar != this.microRedControl.value.id) {
      this.establecimientoControl = new FormControl('',[Validators.required]);
    }
    this.idMicroRedAuxiliar = this.microRedControl.value.id;

    if(this.microRedControl.value) {
      let microRedSeleccionada: microred = this.microRedControl.value
      let establiecimientosEncontrados: Establecimiento[] = microRedSeleccionada.establecimientos;
      console.log(establiecimientosEncontrados)
      this.establecimientosFiltrados = this.obtenerValoresFormControl(this.establecimientoControl, establiecimientosEncontrados);
    }
  }
  //método que escucha si hay algún cambio en el autocomplete
  onChangeProvincias() {

    //validamos si es un empleado para actualizar y si el id redSalud es diferente al del empleado 
    if(this.idProvinciaAuxiliar != 0 && this.idProvinciaAuxiliar != this.provinciaControl.value.id) {
      this.distritoControl = new FormControl('',[Validators.required]); 
    }

    this.idProvinciaAuxiliar = this.provinciaControl.value.id;   
    if(this.provinciaControl.value) {
      let provinciaSeleccionada: provincia = this.provinciaControl.value
      let distritosEncontrados: distrito[] = provinciaSeleccionada.distritos;
      this.distritosFiltradas = this.obtenerValoresFormControl(this.distritoControl, distritosEncontrados);
    }
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

  displayFn(objeto: any): string {
    return objeto && objeto.nombre ? objeto.nombre : '';
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

  
  registrar(formEmpleado: any) {
    let empleadonuevo : empleado = new empleado();
    //si se actualiza, obtenemos el id del empleado encontrado y lo seteamos
    //si no se settea el id, crearía un nuevo empleado
    if(this.data.empleado) {
      empleadonuevo.id = this.data.empleado.id;
    }

    //se instancian el distrito y el establecimiento para poder establecer su respectivo ID
    //solo se necesita los id de estas clases, ya que los demás no están relacionado directamente con el empleado
    let distritoSeleccionado: distrito = new distrito();
    let establecimientoSeleccinado: Establecimiento = new Establecimiento();
    distritoSeleccionado.id = this.distritoControl.value.id;
    establecimientoSeleccinado.id = this.establecimientoControl.value.id;

    empleadonuevo.dni=this.formEmpleado.controls['dni'].value
    empleadonuevo.nombre=this.formEmpleado.controls['nombre'].value
    empleadonuevo.distrito = distritoSeleccionado;
    empleadonuevo.establecimiento = establecimientoSeleccinado;

    this.empleadoapi.registrar(empleadonuevo).subscribe(result => {
      empleadonuevo = result.data;

      if(!this.data.empleado) {
        this.openSnackBar(result.message)
        const dialogRef = this.dialog.open(FamiliaDialogComponent, {
          data: {empleado: empleadonuevo } 
        });
        this.dialogRef.close();
      } else {
        this.openSnackBar('Empleado actualizado');
        this.dialogRef.close(this.formEmpleado.value);

      }



    }, err => {
      this.openSnackBar(err.error.message)
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

}