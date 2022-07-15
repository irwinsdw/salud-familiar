import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericoService } from './generico.service';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService extends GenericoService {

  url=`${this.url_base}/v1/caracteristica`;

  constructor(private http: HttpClient) { 
    
    super()
  }

  listarCaracteristicas():Observable<any>{
    return this.http.get<any>(this.url+'/listar');
  }

  agregarRespuestaCaracteristica(respuestas: any): Observable<any> {
    return this.http.post<any>(this.url, respuestas);
  }

  listaDeCaracteristicasPorFamilia(idFamilia: number): Observable<any>{
    return this.http.get<any>(this.url+"/valores/"+idFamilia);
  }
}
