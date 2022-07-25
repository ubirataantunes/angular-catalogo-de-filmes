import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../Models/Filmes';

@Injectable()
export class Filmes {
    elementApiUrl = "api/Filmes"
  constructor(private http: HttpClient) { }

  getElements(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.elementApiUrl)
  }
}