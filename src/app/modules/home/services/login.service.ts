import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Login } from 'src/app/core/models/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url=`${environment.URL_BASE}/login`;
  constructor(private http: HttpClient) { 
   
  }
  public login(login:Login):any{
    const body= JSON.stringify(login);
    console.log(body);

    return this.http.post<any>(this.url,body,{observe: 'response' })

    .pipe(map( res=> {
      const token = res.headers.get('authorization');
      console.log('authorization token -> '+token);
      if(token){
        sessionStorage.setItem('token' , token);
      }
      return res ; 
    }));


  }
}