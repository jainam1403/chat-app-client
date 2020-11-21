import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  findByParticipantId(id: number): Observable<any[]> {
    return this.http.get(`/api/messages/participant/` + id, { observe: 'response' }).pipe(map(res => <any[]>res.body));
  }
}
