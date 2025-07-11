import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/api/authUser';

  login(credentials: { email: string; password: string }):  Observable<any> {
    return this.http.post(`${this.apiUrl}/login`,credentials);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  constructor() { }
}
