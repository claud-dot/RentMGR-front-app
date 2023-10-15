import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/dashboard/services/notification.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loading : any = {
    register : false,
    login : false
  }

  hidePass1 : boolean = true;
  hidePass2 : boolean = true;

  registerForm !: FormGroup;
  loginForm !: FormGroup;

  constructor(private fb : FormBuilder , private authService : AuthService , private router : Router , private notif : NotificationService , private cookieService: CookieService) { }

  initForm(){
    this.registerForm = this.fb.group({
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      email : ['', Validators.compose([Validators.required , Validators.email])],
      password : ['', Validators.required]
    })

    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required , Validators.email])],
      password : ['' , Validators.required]
    })

    this.hidePass1 = true;
    this.hidePass2 = true;
  }

  linkScrollTo(event : Event ,to : string){
    this.initForm()
    event.preventDefault();
    const element : HTMLElement = document.getElementById(to) as HTMLElement;

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onToggleEye(number : number){
    if(number == 1){
      this.hidePass1 = !this.hidePass1;
    }else if( number == 2){
      this.hidePass2 = !this.hidePass2;
    }
  }

  async onRegister(){
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid){
        this.loading.register = true;
        const signalRegister : any = await this.authService.register(this.registerForm.value);
        if(signalRegister.status == 200){
          this.loading.register = false;
          this.notif.openToastr(signalRegister.message , 'Register', 'success');
          this.linkScrollTo(new Event('click') , 'signin');
        }else{
          this.loading.register = false;
          this.notif.openToastr(signalRegister.message , 'Register', 'error');
        }
    }
  }

  async onLogin(){
    this.registerForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.loading.login = true;
      const signalLogin : any = await this.authService.login(this.loginForm.value);
      if(signalLogin.status == 200){
        localStorage.setItem('current-user', JSON.stringify(signalLogin.data));
        this.cookieService.set('RENT-AUTH' , signalLogin.data.authentification.sessionToken);
        this.loading.login = false;
        this.notif.openToastr(signalLogin.message , 'Register', 'success');
        this.router.navigate(['/user-spaces/']);
      }else{
        this.loading.login = false;
        this.notif.openToastr(signalLogin.message , 'Register', 'error');
      }
    }
  }

  ngOnInit() {
    this.linkScrollTo(new Event('click') , 'signin');
  }

}
