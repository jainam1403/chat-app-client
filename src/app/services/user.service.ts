import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  searchByPhoneNumber(sphoneNumber: number, tphoneNumber: number): Observable<any> {
    return this.http.post(environment.apiUrl + `/api/user/validate`, { sourcePhoneNumber: sphoneNumber, targetPhoneNumber: tphoneNumber }).pipe(
      map(res => res));
  }
}
