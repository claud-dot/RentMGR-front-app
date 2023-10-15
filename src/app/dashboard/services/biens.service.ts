import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBiens } from 'src/app/interfaces/IBiens';
import { IUser } from 'src/app/interfaces/IUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiensService {

  constructor(private http : HttpClient) {}

  public getBiens(idUser : string){
    const options = {
      withCredentials: true,
    };
    return this.http.get(`${environment.baseUrl}/property/${idUser}`, options).toPromise();
  }

  public addBien(bienData : IBiens , idUser : string){
      const options = {
        withCredentials: true,
      };
      return this.http.post(`${environment.baseUrl}/property/create/${idUser}`, bienData , options).toPromise();
  }

  public updateBien(idBien : string,bienData : IBiens){
    const options = {
      withCredentials: true,
    };
    return this.http.put(`${environment.baseUrl}/property/update/${idBien}`, bienData, options).toPromise();
  }

  public deleteBien(idBien : string){
    const options = {
      withCredentials: true,
    };
    return this.http.delete(`${environment.baseUrl}/property/update/${idBien}`, options).toPromise();
  }

}
