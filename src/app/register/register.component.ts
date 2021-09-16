import { Component, OnInit } from '@angular/core';
import { RegisterDto } from '../models/dto/register.dto';
import { RegisterService } from '../services/register.service';
import { FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterDto = new RegisterDto();
  
  //Se crea un FormGroup para controlar la entrada
  RegisterForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(12)])
  });

  constructor(private service: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    //Se asignan los valores a las variables
    this.RegisterDto.email = this.RegisterForm.controls['email'].value;
    this.RegisterDto.password = this.RegisterForm.controls['pass'].value;
    this.RegisterDto.username = this.RegisterForm.controls['username'].value;
    console.log(this.RegisterDto.code)
    console.log(this.RegisterDto.username)
    console.log(this.RegisterDto.email)
    console.log(this.RegisterDto.password)

    //Si el formulario es válido efectuar el registro haciendo uso del servicio
    if(this.RegisterForm.valid){
      this.service.doRegister(this.RegisterDto).subscribe(
        data =>{
          console.log(data);
          localStorage.setItem('token', data.token);
          let token  = localStorage.getItem('token');
          alert('Login correcto');
          this.router.navigate(['login']);
        },
        error => {
          if(error.status == 400) {
            alert('Datos de registro incorrectos');
          } else {
            alert('Error del servidor');
          }
          console.log(error);
        }
      );
    } else {
      console.log('Falta algún campo en el formulario');
    }
  }

  checkError(controlName: string) {
    return this.RegisterForm.controls[controlName].errors
    && this.RegisterForm.controls[controlName].dirty;
  }


}
