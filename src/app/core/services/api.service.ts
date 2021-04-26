import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public loadCharacters(): Observable<Products[]> {
    return this.http.get<any>(`${environment.apiUrl}/characters`).pipe(
      map(data => data)
    );
  }

}
