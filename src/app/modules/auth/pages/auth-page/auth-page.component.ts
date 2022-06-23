import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/models/login';
import { LoginService } from 'src/app/modules/home/services/login.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  formLogin!: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private loginService: LoginService,
               private router: Router ) { }

  ngOnInit() {

    this.formLogin = this.formBuilder.group({
      usuario: ['ADMIN', [Validators.required, Validators.minLength(5)]],
      clave: ['abc', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    const login: Login = {
      usuario: this.f['usuario'].value,
      clave: this.f['clave'].value
    };

    this.loginService.login(login)
      .subscribe({
        next : (res: any) => {
          this.router.navigate(['/home']);
          console.log('Login OK');
          console.log('response' + res);


        },
        error: ( ) => {
          console.log('error de login')
        }
      });

  }

  get f() {
    return this.formLogin.controls;
  }
  iniciarSesion(){
    this.router.navigate(['/empleado']);
  }
}
