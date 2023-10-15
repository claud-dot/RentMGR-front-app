import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocataire } from 'src/app/interfaces/ILocataire';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocataireService {

  constructor(private http : HttpClient) { }

  public getLocataires(idLocataire : string){
    const options = {
      withCredentials: true,
    };
    return this.http.get(`${environment.baseUrl}/tenant/${idLocataire}`, options).toPromise();
  }

  public addLocataire(bienData : ILocataire ){
    const options = {
      withCredentials: true,
    };
    return this.http.post(`${environment.baseUrl}/tenant/create`, bienData, options).toPromise();
  }

  public updateLocataire(idLocation : string,bienData : ILocataire){
    const options = {
      withCredentials: true,
    };
    return this.http.put(`${environment.baseUrl}/tenant/update/${idLocation}`, bienData , options).toPromise();
  }

  public deleteLocataire(idLocation : string){
    const options = {
      withCredentials: true,
    };
    return this.http.delete(`${environment.baseUrl}/tenant/update/${idLocation}`,options).toPromise();
  }


}
