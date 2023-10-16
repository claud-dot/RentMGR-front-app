import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

   //update
   loadLocation : boolean = false;
   isEditMode : boolean = false;
   bienId !: string;

  typeBiens = [
    "Maison",
    "Parking",
    "Studio",
    "Commerce",
    "Appartement"
  ]

  constructor(private fb : FormBuilder ,
     private bienService : BiensService ,
     private router : Router ,
     private notif : NotificationService ,
     private activeRoute : ActivatedRoute, ) {
    const userData = localStorage.getItem('current-user');
    this.user = userData ? JSON.parse(userData) : null;

    this.activeRoute.paramMap.subscribe((params) => {
      this.bienId = params.get('idBien') as string;
      this.isEditMode = !!this.bienId; 
    });
  }

  ngOnInit() {
    this.typeSelected = this.typeBiens[0];
    this.createForm = this.fb.group({
      type : ['', Validators.required],
      loyer : ['' , Validators.compose([Validators.required , Validators.min(0)])],
      surface : ['' , Validators.compose([Validators.required , Validators.min(0)])],
      adresse_postale : ['' , Validators.required]
    })

    if (this.isEditMode) {
      this.getBien();
    }
  }

  async getBien(){
    this.loadLocation = true;
    const signalFind : any = await this.bienService.getBienById(this.bienId);
    if(signalFind.status ==200){
      const bien = signalFind.data;
      this.createForm.patchValue({
        type : bien.type,
        loyer : bien.loyer,
        surface : bien.surface,
        adresse_postale : bien.adresse_postale
      })
      this.loadLocation = false;
    }else{
      this.notif.openToastr(signalFind.message , "Get Bien" , 'error');
      this.router.navigate(['/user-space/bin/list']);
      this.loadLocation = false;
    }
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
      const signalCreate : any = this.isEditMode ? await this.bienService.updateBien(this.bienId , bien) : await this.bienService.addBien(bien, this.user._id as string);
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
