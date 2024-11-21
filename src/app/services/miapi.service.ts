import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiapiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  // Método GET para obtener los usuarios
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método POST para agregar un nuevo usuario
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
