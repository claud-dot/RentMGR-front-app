import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BiensService } from 'src/app/dashboard/services/biens.service';
import { LocataireService } from 'src/app/dashboard/services/locataire.service';
import { NotificationService } from 'src/app/dashboard/services/notification.service';
import { IBiens } from 'src/app/interfaces/IBiens';
import { ILocataire } from 'src/app/interfaces/ILocataire';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-create-locataire',
  templateUrl: './create-locataire.component.html',
  styleUrls: ['./create-locataire.component.css']
})
export class CreateLocataireComponent implements OnInit {
  createForm !: FormGroup;
  loadingBien : boolean = false;
  loading : boolean = false;
  bienSelected !: string;
  listBien : IBiens[] = [];
  user : IUser;

  constructor(
      private fb : FormBuilder , 
      private bienService : BiensService ,
      private locatiobService : LocataireService,
      private router : Router, 
      private notif : NotificationService) {
    const userData = localStorage.getItem('current-user');
    this.user = userData ? JSON.parse(userData) : null;
  }

  ngOnInit() {
    this.getListBiens();
  }

  async getListBiens(){
      this.loadingBien = true;
      const signalGet : any = await this.bienService.getBiens(this.user._id as string);
      if(signalGet.status ==200){
        this.listBien = signalGet.data;
        this.bienSelected = this.listBien[0]._id as string;
        this.loadingBien = false;
      }else{
        this.notif.openToastr(signalGet.message , "Get list Biens" , 'error');
        this.loadingBien = false;
      }

      this.initForm();
  }

  initForm(){
    this.createForm = this.fb.group({
      idProperty : ['' , Validators.required],
      nom : ['', Validators.required],
      prenom : ['' , Validators.required],
      email : ['' , Validators.compose([Validators.required , Validators.email])],
      telephone : ['' , Validators.required]
    })
  }

  onSelectType(event : Event){
    this.bienSelected = (event.target as HTMLSelectElement).value;;
  }

  async onSubmit(){
    this.createForm.markAllAsTouched();
    if(this.createForm.valid){
      this.loading = true;
      const location : ILocataire = this.createForm.value;
      const signalCreate : any = await this.locatiobService.addLocataire(location); 
      if(signalCreate!=null && signalCreate.status == 200){
        this.loading = false;
        this.notif.openToastr(signalCreate.message , 'Create biens' , 'success');
        this.router.navigate(['/user-space/location/list']);
      }else{
        this.loading = false;
        this.notif.openToastr(signalCreate.message , 'Create biens' , 'error');
      }
    }else{
      this.notif.openToastr("Make all input valid !" , 'Create biens' , 'error');
    }
  }

}
