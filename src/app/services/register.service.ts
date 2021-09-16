import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto } from '../models/dto/register.dto';
import { RegResponse } from '../models/interfaces/reg.interface';

const apiUrl = 'https://www.minitwitter.com:3001/apiv1';

const defaultHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
    console.log('Servicio Instanciado');
  }

  doRegister(registerDto: RegisterDto): Observable<RegResponse>{
    return this.http.post<RegResponse>(`${apiUrl}/auth/signup`, registerDto, defaultHeaders);
  }
}
