import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service'; 
import { Observable } from 'rxjs';
import { empleadoVO } from 'src/app/core/models/empleadoVO'; 
import { empleado } from 'src/app/core/models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoVOService extends GenericoService{

  url=`${this.url_base}/v1/Empleado`;
  constructor(private http: HttpClient) { 
    
    super()
  }
  listar():Observable<empleadoVO[]>{
    
    return this.http.get<empleadoVO[]>(this.url);
    
  }
  //buscar(empleado:string):Observable<any>{
    //const url=`${this.url}?PERSONASFAM=${empleado}`;
    //return this.http.get<any>(url);
  //}

  filtrar(empleado:string,pagina:number,limite:number):Observable<any>{
    const url=`${this.url}/vo?PERSONASFAM=${empleado}&pagina=${pagina}&limite=${limite}`;
    return this.http.get<any>(url);
  }
  registrar(empleadoregistrar:empleado):Observable<empleado>{
    const url=`${this.url}`;
    return this.http.post<empleado>(url,empleadoregistrar);
  }
}
