import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { IUser } from "src/app/interfaces/IUser";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http : HttpClient , private cookieService : CookieService){}

    register(userData : IUser){
        return this.http.post(`${environment.baseUrl}/auth/register`, userData).toPromise();
    }

    login(userData : any):Promise<IUser | undefined>{
        return this.http.post<IUser>(`${environment.baseUrl}/auth/login` , userData).toPromise();
    }

    logOut(){
        localStorage.removeItem('current-user');
        this.cookieService.delete('RENT-AUTH');
    }

}