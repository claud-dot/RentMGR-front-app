import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BiensService } from 'src/app/dashboard/services/biens.service';
import { NotificationService } from 'src/app/dashboard/services/notification.service';
import { IBiens } from 'src/app/interfaces/IBiens';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-create-bien',
  templateUrl: './create-bien.component.html',
  styleUrls: ['./create-bien.component.css']
})
export class CreateBienComponent implements OnInit {

  createForm !: FormGroup;
  typeSelected !: string;
  user !: IUser;
  loading : boolean = false;

  typeBiens = [
    "Maison",
    "Parking",
    "Studio",
    "Commerce",
    "Appartement"
  ]

  constructor(private fb : FormBuilder , private bienService : BiensService , private router : Router , private notif : NotificationService) {
    const userData = localStorage.getItem('current-user');
    this.user = userData ? JSON.parse(userData) : null;
  }

  ngOnInit() {
    this.typeSelected = this.typeBiens[0];
    this.createForm = this.fb.group({
      type : ['', Validators.required],
      loyer : ['' , Validators.compose([Validators.required , Validators.min(0)])],
      surface : ['' , Validators.compose([Validators.required , Validators.min(0)])],
      adresse_postale : ['' , Validators.required]
    })
  }

  onSelectType(event : Event){
    this.typeSelected = (event.target as HTMLSelectElement).value;;
  }

  async onSubmit(){
    this.createForm.markAllAsTouched();
    if (this.createForm.valid) {
      this.loading = true;
      let bien : IBiens = this.createForm.value as IBiens;
      bien.idUser = this.user._id as string;
      const signalCreate : any = await this.bienService.addBien(bien, this.user._id as string);
      if(signalCreate!=null && signalCreate.status == 200){
        this.loading = false;
        this.notif.openToastr(signalCreate.message , 'Create biens' , 'success');
        this.router.navigate(['/user-space/bien/list']);
      }else{
        this.loading = false;
        this.notif.openToastr(signalCreate.message , 'Create biens' , 'error');
      }
    }else{
      this.notif.openToastr("Make all input valid !" , 'Create biens' , 'error');
    }
  }

}
