import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Caracteristica } from 'src/app/core/models/caracteristica';
import { Item } from 'src/app/core/models/item';
import { FamiliaComponent } from '../../components/familia/familia.component';
import { CaracteristicaService } from '../../services/caracteristica.service';

interface FamiliaItemUpk {
  familiaId: number;
  itemId: number;
}

interface FamiliaItem {
  familiaItemUpk: FamiliaItemUpk
  valor: string;
  tipo: string
}

@Component({
  selector: 'app-caracteristicas-familia-dialog',
  templateUrl: './caracteristicas-familia-dialog.component.html',
  styleUrls: ['./caracteristicas-familia-dialog.component.css']
})
export class CaracteristicasFamiliaDialogComponent implements OnInit {

  familiaId!: number;

  ingresoFamiliarMonto!: number;
  
  infraRiesgoDescripcion!: string;

  presenciaVectorDescripcion!: string;

  listaDeIDStep1: number[] = [];

  listaDeIdCaracteristicaConItem: any[] = [];
  listaDeIdCaracteristicaConItem2: any[] = [];

  @ViewChild('stepper', { static: false }) stepper!: MatStepper;

  listaFamiliaItem: FamiliaItem[] = [];

  //checkboxes
  ingresoFamiliar:Caracteristica = new Caracteristica();
  aguaDeConsumo:Caracteristica = new Caracteristica()
  abastecimientoDeAgua:Caracteristica = new Caracteristica()
  combustibleParaCocinar:Caracteristica = new Caracteristica()
  nroPersonasPorHabitacion:Caracteristica = new Caracteristica()
  materialDelPiso:Caracteristica = new Caracteristica()
  materialesDePared: Caracteristica= new Caracteristica()
  conservacionDeAlimentos:Caracteristica = new Caracteristica()
  disponibilidadTransportePropio:Caracteristica = new Caracteristica()
  materialDeTecho:Caracteristica = new Caracteristica()
  eliminacionDeExcretas:Caracteristica = new Caracteristica()
  disposicionDeBasura:Caracteristica = new Caracteristica()
  serviciosEnDomicilio:Caracteristica = new Caracteristica()
  riesgoDelEntorno: Caracteristica= new Caracteristica()

  //preguntas
  familiaBotiquinEmergencia: Caracteristica = new Caracteristica();
  familiaMochilaEmergencia: Caracteristica = new Caracteristica();
  viviendaConEspaciosDestinados: Caracteristica = new Caracteristica();
  cocinaConSistemaEliminacionHumo: Caracteristica = new Caracteristica();
  viviendaConInfraestructuraRiesgo: Caracteristica = new Caracteristica();
  presenciaDeVectoresEnVivienda: Caracteristica = new Caracteristica();
  tenenciaDeAnimales: Caracteristica = new Caracteristica();


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


  constructor(private _formBuilder: FormBuilder, 
    private caracteristicaService: CaracteristicaService, 
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FamiliaComponent>) { }

  ngOnInit(): void {

    if(this.data){
      console.log(this.data.familiaId)
      console.log(this.data)
      this.familiaId = this.data.familiaId;
    }
    

    this.caracteristicaService.listarCaracteristicas()
        .subscribe((response: Caracteristica[]) => {
          console.log(response)

          //mapeando los objetos del step1
          this.ingresoFamiliar = response[16];
          this.aguaDeConsumo = response[1];
          this.abastecimientoDeAgua = response[4];
          this.combustibleParaCocinar = response[6];
          this.nroPersonasPorHabitacion = response[7];
          this.conservacionDeAlimentos = response[9];

          //mapeando los objetos del step2
          this.materialDelPiso = response[5];
          this.materialesDePared = response[8];
          this.materialDeTecho = response[11];
          this.eliminacionDeExcretas = response[12];
          this.disposicionDeBasura = response[13];
          this.serviciosEnDomicilio = response[14];

          //mapeando los objetos del step3
          this.familiaBotiquinEmergencia = response[18]
          this.familiaMochilaEmergencia = response[2]
          this.viviendaConEspaciosDestinados = response[19]
          this.cocinaConSistemaEliminacionHumo = response[20]
          this.viviendaConInfraestructuraRiesgo = response[0]
          this.presenciaDeVectoresEnVivienda = response[17]

          //mapeando los objetos del step4
          this.tenenciaDeAnimales = response[3];
          this.riesgoDelEntorno = response[15];
          this.disponibilidadTransportePropio = response[10];
          

          this.caracteristicaService.listaDeCaracteristicasPorFamilia(this.familiaId)
          .subscribe((respuestaFamiliaItems: FamiliaItem[]) => {
            response.forEach(caracteristica => {
              caracteristica.item = caracteristica.item.map((item: Item) => {

                let objetoEncontrado = respuestaFamiliaItems.find((rF: FamiliaItem) => rF.familiaItemUpk.itemId == item.id);

                
                if(objetoEncontrado?.tipo.includes('check')) {
                  item.activo = true;
                  
                  return item
                }

                if(objetoEncontrado?.tipo.includes('numeric')) {
                  this.ingresoFamiliarMonto = +objetoEncontrado.valor;
                  return item
                }

                if(objetoEncontrado?.tipo.includes('texto')) {
                  
                  if(objetoEncontrado.familiaItemUpk.itemId == this.viviendaConInfraestructuraRiesgo.item[0].id){
                    this.infraRiesgoDescripcion = objetoEncontrado.valor;
                  }

                  if(objetoEncontrado.familiaItemUpk.itemId == this.presenciaDeVectoresEnVivienda.item[0].id){
                    this.presenciaVectorDescripcion = objetoEncontrado.valor;
                  }

                  return item
                }

                if(objetoEncontrado?.tipo.includes('pregunta')) {
                  
                  if(objetoEncontrado.valor.includes('true')){
                    item.activo = true;
                  }else{
                    item.activo = false;
                  }
                  return item
                }

                return item
              });
            })
          })
        })
  }

  checkValidationsStep1() {
    this.stepper.next();

    // if(this.ingresoFamiliarMonto) {
      
    // }
  }

  checkValidationsStep3() {
    this.stepper.next();
    // if(this.presenciaVectorDescripcion && this.infraRiesgoDescripcion) {
      
    // }
  }

  agregarRespuestaToListaRespuestas(item: Item, valor: string) {
    let encontrado = false;

    //si la lista está vacía solo agrega y sale de la función
    if(this.listaDeIDStep1.length == 0) {
      this.crearFamiliaItem(item, valor)
      return
    }

    //cuando es de tipo pregunta, se hace un map para buscar si existe la familiaItem y solo cambiar el valor
    if(item.tipo.includes('pregunta')) {
      this.listaFamiliaItem = this.listaFamiliaItem.map(i => {
        if(i.familiaItemUpk.itemId == item.id) {
          i.valor = valor
          encontrado = true;
          return i
        }
        return i;
      })
     
      //si se encuentra la familiaItem se retorna y no sigue el flujo
      if(encontrado) {
        return
      }
      
    }

    //buscamos el ID
    let idEncontrado = this.listaDeIDStep1.find(id => id == item.id);

    if(idEncontrado) {
      this.listaDeIDStep1 = this.listaDeIDStep1.filter(id => id != idEncontrado);
      this.listaFamiliaItem = this.listaFamiliaItem.filter(i => i.familiaItemUpk.itemId != idEncontrado)
      return
    }
    this.crearFamiliaItem(item, valor)
  }

  agregarRespuestaToListaRespuestasMultiple(item: Item, caracteristicaId: number, valor: string) {
    //si la lista está vacía solo agrega y sale de la función
    if(this.listaDeIdCaracteristicaConItem.length == 0){
      this.listaDeIdCaracteristicaConItem.push({caracteristicaId: caracteristicaId, item: item})
      return
    }

    //buscamos si existe el item por su idCaracteristica y el idItem
    let itemEncontrado = this.listaDeIdCaracteristicaConItem.find(carac => carac.caracteristicaId == caracteristicaId && carac.item.id == item.id);
    

    /* si no existe, se agrega el objeto en la lista y elimina la que ta está registrada
    ejm: si ya está marcado AGUA SIN TRATAMIIENTO y guardado en la lista, si le doy clic a AGUA CON TRATAMIENTO 
    se elimina agua sin tratamiento de la lista y se agrega AGUA CON TRATAMIENTO*/
    if(!itemEncontrado){
      this.listaDeIdCaracteristicaConItem.push({caracteristicaId: caracteristicaId, item: item})
      this.listaDeIdCaracteristicaConItem = this.listaDeIdCaracteristicaConItem.filter(carac => carac.caracteristicaId == caracteristicaId && carac.item.id == item.id)
    }


  }

  agregarRespuestaToListaRespuestasMultiple2(item: Item, caracteristicaId: number, valor: string) {

    if(this.listaDeIdCaracteristicaConItem2.length == 0){
      this.listaDeIdCaracteristicaConItem2.push({caracteristicaId: caracteristicaId, item: item})
      return
    }

    let itemEncontrado = this.listaDeIdCaracteristicaConItem2.find(carac => carac.caracteristicaId == caracteristicaId && carac.item.id == item.id);
    

    if(!itemEncontrado){
      this.listaDeIdCaracteristicaConItem2.push({caracteristicaId: caracteristicaId, item: item})
      this.listaDeIdCaracteristicaConItem2 = this.listaDeIdCaracteristicaConItem2.filter(carac => carac.caracteristicaId == caracteristicaId && carac.item.id == item.id)
    }

  }



  crearFamiliaItem(item: Item, valor: string) {
    

    let idItem: number = item.id;
    let itemTipo: string = item.tipo;

    let familiaItemUpk: FamiliaItemUpk = {itemId: idItem, familiaId: this.familiaId};
    let familiaItem: FamiliaItem = {familiaItemUpk: familiaItemUpk, tipo: itemTipo, valor: valor};
    this.listaFamiliaItem.push(familiaItem);
    this.listaDeIDStep1.push(item.id);
  }


  agregarRespuestaCaracteristica() {

    this.listaDeIdCaracteristicaConItem.forEach(item => {
      this.crearFamiliaItem(item.item, 'true');
    })

    this.listaDeIdCaracteristicaConItem2.forEach(item => {
      this.crearFamiliaItem(item.item, 'true');
    })

    if(this.ingresoFamiliarMonto){
      this.crearFamiliaItem(this.ingresoFamiliar.item[0], this.ingresoFamiliarMonto.toString())
    }

    if(this.infraRiesgoDescripcion){
      this.crearFamiliaItem(this.viviendaConInfraestructuraRiesgo.item[0], this.infraRiesgoDescripcion)
    }

    if(this.presenciaVectorDescripcion) {
      this.crearFamiliaItem(this.presenciaDeVectoresEnVivienda.item[0], this.presenciaVectorDescripcion)
    }

      this.caracteristicaService.agregarRespuestaCaracteristica(this.listaFamiliaItem)
      .subscribe(response => {
        this.openSnackBar('Registro exitoso')
        this.onNoClick();
      }, err => {
        this.openSnackBar('Ocurrio algo')
      })
    

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
