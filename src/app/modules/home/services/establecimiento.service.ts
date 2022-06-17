import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service'; 
import { Observable } from 'rxjs';
import { Establecimiento } from 'src/app/core/models/establecimiento';  
@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService extends GenericoService {


  url=`${this.url_base}/v1/establecimientos`;
  constructor(private http: HttpClient) { 
    
    super()
  }
  buscar(Establecimiento:string):Observable<Establecimiento[]>{
    const url=`${this.url}/establecimientos?esta=${Establecimiento}`;
    return this.http.get<Establecimiento[]>(url);
  }

  listar():Observable<Establecimiento[]>{
    
    return this.http.get<Establecimiento[]>(this.url);
    
  }
  registrar(pedido:Establecimiento):Observable<Establecimiento>{
    const url=`${this.url}`;
    return this.http.post<Establecimiento>(url,pedido);
  }
}
