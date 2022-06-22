import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from 'src/app/core/models/encuesta';
import { GenericoService } from './generico.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService extends GenericoService {
  url=`${this.url_base}/v1/encuestas`;
  token=sessionStorage.getItem('token')
  constructor(private http: HttpClient) { 
    super()
  }

  protected options = {
    header:new HttpHeaders()
    .set('authorization',this.token ||""),
    params: new HttpParams()
  }

  registrar(encuesta: Encuesta): Observable<any> {
    return this.http.post<any>(`${this.url}`, encuesta, this.options);
  }

  
  
}
