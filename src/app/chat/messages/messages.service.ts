import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  findByParticipantId(id: number): Observable<any[]> {
    return this.http.get(environment.apiUrl + `/api/messages/` + id, { observe: 'response' }).pipe(map(res => <any[]>res.body));
  }
}
