import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ZohoCrmService {
  private proxyUrl = 'http://localhost:3000/api/zoho/contacts'; 

  constructor(private http: HttpClient) {}

  async syncUsers(users: User[]) {
    console.log("este")
    const body = {
      data: users.map(u => ({
        Last_Name: u.name,
        Email: u.email,
        Phone: u.phone,
        Account_Name: u.company.name
      }))
    };
    const headers = new HttpHeaders({
      Authorization: `Zoho-oauthtoken ${environment.zoho.access_token}`,
      'Content-Type': 'application/json'
    });

    try {
        const response = await firstValueFrom(this.http.post(this.proxyUrl, body, { headers }));
        console.log('Respuesta:', response);
        return response;
    } catch (error) {
        console.error('Error en el post:', error);
        throw error;
    }
  }
}