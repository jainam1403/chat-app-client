import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private router: Router) { }

  findByUserId(createdBy: number): Observable<any[]> {
    return this.http.get(`/api/room/` + createdBy, { observe: 'response' }).pipe(map(res => <any[]>res.body));
  }
}
