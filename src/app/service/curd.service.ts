import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/CurdOperation/';

@Injectable({
  providedIn: 'root'
})
export class CurdService {

  constructor(private http: Http) { }

  public create(data: any): Observable<any[]> {
    return this.http.post(API_URL + 'create', data).pipe( map(response => response), catchError(error => of(error)));
  }

  public delete(user_id: any): Observable<any[]> {
    return this.http.get(API_URL + 'delete/' + user_id).pipe( map(response => response), catchError(error => of(error)));
  }

  public edit(data: any): Observable<any[]> {
    return this.http.post(API_URL + 'edit', data).pipe( map(response => response), catchError(error => of(error)));
  }

  public List(): Observable<any[]> {
    return this.http.get(API_URL + 'List')
    .pipe( map(response => response), catchError(error => of(error)) );
 }

}
