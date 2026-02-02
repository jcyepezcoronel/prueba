import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { isValidCompany, normalizePhone, normalizeWebsite } from '../helpers/user.helpers';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<ApiUser[]>(this.apiUrl).pipe(
      map(users => users.map(user => this.transform(user)))
    );
  }

  private transform(user: ApiUser): User {
    return {
      ...user,
      phone: normalizePhone(user.phone),
      website: normalizeWebsite(user.website),
      company: {
        name: user.company.name,
        isValid: isValidCompany(user.company.name)
      }
    };
  }
}