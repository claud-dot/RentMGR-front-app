import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/components/auth/auth.service';
import { ILocataire } from 'src/app/interfaces/ILocataire';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocataireService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public getLocataires(idUser: string) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };
    console.log('Header =>', headers);

    return this.http
      .get(`${environment.baseUrl}/tenant/${idUser}`, { headers })
      .toPromise();
  }

  public generateCall(idUser: string) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };
    
    return this.http
      .post(`${environment.baseUrl}/quittance/${idUser}`, {}, { headers })
      .toPromise();
  }

  public addLocataire(bienData: ILocataire) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };
    console.log('Header =>', headers);

    return this.http
      .post(`${environment.baseUrl}/tenant/create`, bienData, { headers })
      .toPromise();
  }

  public updateLocataire(idLocation: string, bienData: ILocataire) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };
    console.log('Header =>', headers);

    return this.http
      .put(`${environment.baseUrl}/tenant/update/${idLocation}`, bienData, {
        headers,
      })
      .toPromise();
  }

  public getLocationById(idLocation: string) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };
    console.log('Header =>', headers);

    return this.http
      .get(`${environment.baseUrl}/tenant/id/${idLocation}`, { headers })
      .toPromise();
  }

  public deleteLocataire(idLocation: string) {
    const headers = {
      Authorization: `Bearer ${this.authService.sessionToken()}`,
    };
    console.log('Header =>', headers);

    return this.http
      .post(
        `${environment.baseUrl}/tenant/delete/${idLocation}`,
        {},
        { headers }
      )
      .toPromise();
  }
}
