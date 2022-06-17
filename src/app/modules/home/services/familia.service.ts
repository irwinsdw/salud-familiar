import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Familia } from 'src/app/core/models/familia';
import { GenericoService } from './generico.service';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService extends GenericoService{

  url=`${this.url_base}/v1/familias`;
  constructor(private http: HttpClient) { 
    
    super()
  }
  listar():Observable<Familia[]>{
    
    return this.http.get<Familia[]>(this.url);
    
  }
  //buscar(empleado:string):Observable<any>{
    //const url=`${this.url}?PERSONASFAM=${empleado}`;
    //return this.http.get<any>(url);
  //}

  filtrar(familia:string,pagina:number,limite:number):Observable<any>{
    const url=`${this.url}/by-nombre?familia=${familia}&pagina=${pagina}&limite=${limite}`;
    return this.http.get<any>(url);
  }
  registrar(empleadoregistrar:Familia):Observable<Familia>{
    const url=`${this.url}`;
    return this.http.post<Familia>(url,empleadoregistrar);
  }
}
