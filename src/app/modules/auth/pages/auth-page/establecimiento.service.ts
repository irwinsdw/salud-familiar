import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Establecimiento } from 'src/app/core/models/establecimiento';


@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {

  url='http://localhost:8080/api-pedidos/v1/Empleado'

  constructor(private http: HttpClient) {
    
  }

  buscarx(razonSocial:string):Observable<Establecimiento[]>{
    console.log(this.url);
    const url=`${this.url}/vo-by?pagina=1`;
    console.log(url);
    return this.http.get<Establecimiento[]>(url);
  }

 
}
