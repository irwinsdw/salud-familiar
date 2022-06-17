import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = {
    defaultOptions: [], accessLink: []
  }



  constructor() { }

  ngOnInit(): void {

    this.mainMenu.defaultOptions = [
      {
        name: 'Establecimiento',
        icon: 'location_city',
        router: ['/', 'auth']
      },
      {
        name: 'Ubigeo',
        icon: 'place',
        router: ['/', 'history']
      },
      {
        name: 'Personal',
        icon: 'person',
        router: ['/', 'favorites']
      },
      {
        name: 'Familia',
        icon: 'wc',
        router: ['/', 'favorites']
      },
      {
        name: 'Historia familiar',
        icon: 'folder',
        router: ['/', 'favorites']
      },
      {
        name: 'Estructura familiar',
        icon: 'person_add',
        router: ['/', 'favorites']
      },
      {
        name: 'Riesgo familiar EV',
        icon: 'warning',
        router: ['/', 'favorites']
      },
      {
        name: 'Familiar vivienda',
        icon: 'domain',
        router: ['/', 'favorites']
      },
      {
        name: 'Encuesta famliar',
        icon: 'assignment_turned_in',
        router: ['/', 'favorites']
      },
      {
        name: 'Reporte general',
        icon: 'pie_chart',
        router: ['/', 'favorites']
      }
    ]

  }

}
