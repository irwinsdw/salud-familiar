import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = {
    defaultOptions: [], accessLink: []
  }



  constructor() { }

  ngOnInit(): void {

    this.mainMenu.defaultOptions = [
      {
        name: 'Empleado',
        icon: 'location_city',
        router: ['/home','empleado']
      },
      {
        name: 'Establecimiento',
        icon: 'location_city',
        router: ['/home','establecimientos']
      },
      {
        name: 'Ubigeo',
        icon: 'place',
        router: ['/home', 'history']
      },
      {
        name: 'Personal',
        icon: 'person',
        router: ['/home','empleado']
      },
      {
        name: 'Familia',
        icon: 'wc',
        router: ['/home','familias']
      },
      {
        name: 'Historia familiar',
        icon: 'folder',
        router: ['/home', 'historia-familiar']
      },
      {
        name: 'Estructura familiar',
        icon: 'person_add',
        router: ['/home', 'estructura-familiar']
      },
      {
        name: 'Riesgo familiar EV',
        icon: 'warning',
        router: ['/home', 'favorites']
      },
      {
        name: 'Familiar vivienda',
        icon: 'domain',
        router: ['/home', 'favorites']
      },
      {
        name: 'Encuesta famliar',
        icon: 'assignment_turned_in',
        router: ['/home', 'favorites']
      },
      {
        name: 'Reporte general',
        icon: 'pie_chart',
        router: ['/home', 'favorites']
      }
    ]

  }
}
