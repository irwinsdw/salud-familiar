import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/core/models/persona';
import { GenericoService } from './generico.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends GenericoService {
  url=`${this.url_base}/v1/persona`;
  token=sessionStorage.getItem('token')
  constructor(private http: HttpClient) { 
    super()
  }

  protected options = {
    header:new HttpHeaders()
    .set('authorization',this.token ||""),
    params: new HttpParams()
  }

  registrar(persona: Persona): Observable<any> {
    return this.http.post<any>(`${this.url}`, persona, this.options);
  }

  buscarPersonaPorDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.url}/burcar_por_dni/${dni}`);
  }


  
}
