import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "src/app/interfaces/IUser";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http : HttpClient){}

    register(userData : IUser){
        return this.http.post(`${environment.baseUrl}/auth/register`, userData).toPromise();
    }

    login(userData : any):Promise<IUser | undefined>{
        return this.http.post<IUser>(`${environment.baseUrl}/auth/login` , userData).toPromise();
    }

}