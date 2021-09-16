import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../models/dto/login.dto';
import { AuthResponse } from '../models/interfaces/auth.response';
import { Observable } from 'rxjs';
import { AllTweetsResponse } from '../models/interfaces/tweet.response';
import { TweetDto } from '../models/dto/tweet.dto';

const apiUrl = 'https://www.minitwitter.com:3001/apiv1';

const defaultHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'  
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
    console.log('Servicio instanciado');
   }

   doLogin(loginDto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${apiUrl}/auth/login`, loginDto, defaultHeaders);
  }

  getAllTweets(): Observable<AllTweetsResponse[]>{
    let token = localStorage.getItem('token');
    const authHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<AllTweetsResponse[]>(`${apiUrl}/tweets/all`, authHeaders);

  } 
  
  publishTweet(newtweet: TweetDto): Observable<AuthResponse>{
    let token = localStorage.getItem('token');

    const authHeaders = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<AuthResponse>(`${apiUrl}/tweets/create`, newtweet, authHeaders);
  }

  favouriteTweet(id:number): Observable<AllTweetsResponse>{
    let token = localStorage.getItem('token');

    const authHeaders = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<AllTweetsResponse>(`${apiUrl}/tweets/like/${id}`, null, authHeaders);
  }
  

}
