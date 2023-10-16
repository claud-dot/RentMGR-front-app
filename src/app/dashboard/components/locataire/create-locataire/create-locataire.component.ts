import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  //update
  loadLocation : boolean = false;
  isEditMode : boolean = false;
  locationId !: string;

  constructor(
      private fb : FormBuilder , 
      private bienService : BiensService ,
      private locationService : LocataireService,
      private router : Router,
      private activeRoute : ActivatedRoute, 
      private notif : NotificationService) {
    const userData = localStorage.getItem('current-user');
    this.user = userData ? JSON.parse(userData) : null;

    this.activeRoute.paramMap.subscribe((params) => {
      this.locationId = params.get('idLocation') as string;
      this.isEditMode = !!this.locationId; // Si bienId est défini, c'est en mode édition
    });
  }

  ngOnInit() {
    this.getListBiens();

    if (this.isEditMode) {
      this.getLocation();
    }
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

  async getLocation(){
    this.loadLocation = true;
    const signalFind : any = await this.locationService.getLocationById(this.locationId);
    if(signalFind.status ==200){
      const location = signalFind.data;
      this.createForm.patchValue({
        idProperty : location.idProperty,
        nom : location.nom,
        prenom : location.prenom,
        email : location.email,
        telephone : location.telephone
      })
      this.loadLocation = false;
    }else{
      this.notif.openToastr(signalFind.message , "Get Location" , 'error');
      this.router.navigate(['/user-space/location/list']);
      this.loadLocation = false;
    }
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
      let location : ILocataire = this.createForm.value;
      location.dateLocation = new Date();
      const signalCreate : any = this.isEditMode ? await this.locationService.updateLocataire(this.locationId,location)  : await this.locationService.addLocataire(location); 
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
