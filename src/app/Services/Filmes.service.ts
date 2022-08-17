import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../Models/Filmes';

@Injectable()
export class Filmes {
  elementApiUrl = "https://localhost:44384/api/Filmes"
  constructor(private http: HttpClient) { }

  getElements(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.elementApiUrl);
  }

  createElements(element: Filme): Observable<Filme> {
    return this.http.post<Filme>(this.elementApiUrl, element);
  }

  editElement(element: Filme): Observable<Filme> {
    return this.http.put<Filme>(this.elementApiUrl, element);
  }
}