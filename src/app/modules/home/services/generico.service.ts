import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericoService {
  protected url_base=`${environment.URL_BASE}`;

  constructor() { }
}
