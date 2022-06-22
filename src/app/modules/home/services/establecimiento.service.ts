import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service'; 
import { Observable } from 'rxjs';
import { Establecimiento } from 'src/app/core/models/establecimiento';  
import { microred } from 'src/app/core/models/microred';
import { redsalud } from 'src/app/core/models/redsalud';
import { provincia } from 'src/app/core/models/provincia';
@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService extends GenericoService {


  url=`${this.url_base}/v1/Establecimiento`;
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

  listarRedesSalud():Observable<redsalud[]>{
    return this.http.get<redsalud[]>(this.url+'/redes-salud');
  }

  listarProvincias():Observable<provincia[]>{
    return this.http.get<provincia[]>(this.url+'/provincias');
  }


  registrar(pedido:Establecimiento):Observable<Establecimiento>{
    const url=`${this.url}`;
    return this.http.post<Establecimiento>(url,pedido);
  }
}
