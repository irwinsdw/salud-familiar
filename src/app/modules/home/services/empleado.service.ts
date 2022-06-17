import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { empleado } from 'src/app/core/models/empleado';
import { GenericoService } from './generico.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends GenericoService{
  url=`${this.url_base}/v1/Empleado`;
  token=sessionStorage.getItem('token')

protected options = {
  header:new HttpHeaders()
  .set('authorization',this.token ||""),
  params: new HttpParams()
}

  constructor(private http: HttpClient) { 
  

    super()
  }
  listar():Observable<empleado[]>{
    
    return this.http.get<empleado[]>(this.url,this.options);
  }

  buscar(dniempleado:string):Observable<any>{
    const url=`${this.url}/by-empleado/${dniempleado}`;
    return this.http.get<any>(url,this.options);
  }
  paginar(pagina:number,limite:number):Observable<any>{
    const url=`${this.url}/empleados?pagina=${pagina}&limite=${limite}`;
    return this.http.get<any>(url,this.options);
  }
  registrar(empleado:empleado):Observable<empleado>{
    const url=`${this.url}`;
    return this.http.post<empleado>(url,empleado,this.options);
  }
  editar (empleado:empleado):Observable<empleado>{
    const url=`${this.url}`;
    return this.http.post<empleado>(url,empleado,this.options);
}
    
}