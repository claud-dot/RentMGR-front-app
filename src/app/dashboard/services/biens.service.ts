import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/components/auth/auth.service';
import { IBiens } from 'src/app/interfaces/IBiens';
import { IUser } from 'src/app/interfaces/IUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BiensService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public getBiens(idUser: string) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };
    console.log('Header =>', headers);

    return this.http
      .get(`${environment.baseUrl}/property/${idUser}`, { headers })
      .toPromise();
  }

  public addBien(bienData: IBiens, idUser: string) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };

    return this.http
      .post(`${environment.baseUrl}/property/create/${idUser}`, bienData, {
        headers,
      })
      .toPromise();
  }

  public getBienById(idBien: string) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };

    return this.http
      .get(`${environment.baseUrl}/property/id/${idBien}`, { headers })
      .toPromise();
  }

  public updateBien(idBien: string, bienData: IBiens) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };

    return this.http
      .put(`${environment.baseUrl}/property/update/${idBien}`, bienData, {
        headers,
      })
      .toPromise();
  }

  public deleteBien(idBien: string) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };

    return this.http
      .post(`${environment.baseUrl}/property/delete/${idBien}`, {}, { headers })
      .toPromise();
  }
}
