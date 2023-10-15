import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentCallService {

  user : IUser | null;

  constructor(private http : HttpClient) {
    const userData = localStorage.getItem('current-user');
    this.user = userData ? JSON.parse(userData) : null;
  }

  makeCall(idLocation : string){
    if(this.user){
      const body = {
        idUser : this.user._id,
        idTenant : idLocation,
        subject : "Quittance de loyer"
      }
      return this.http.post(`${environment.baseUrl}/quittance`,body).toPromise();
    }else{
      return null;
    }
  }

}
