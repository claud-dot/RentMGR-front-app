import { Component, OnInit } from '@angular/core';
import { BiensService } from 'src/app/dashboard/services/biens.service';
import { LocataireService } from 'src/app/dashboard/services/locataire.service';
import { NotificationService } from 'src/app/dashboard/services/notification.service';
import { IBiens } from 'src/app/interfaces/IBiens';
import { ILocataire } from 'src/app/interfaces/ILocataire';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-list-locataire',
  templateUrl: './list-locataire.component.html',
  styleUrls: ['./list-locataire.component.css']
})
export class ListLocataireComponent implements OnInit {
  loading : boolean = false;
  loadCall : boolean = false;
  loadDelete : boolean = false;
  user : IUser;
  listLocation : any[] = [];

  constructor(private locationService : LocataireService , private notifs : NotificationService) {
    const userData = localStorage.getItem('current-user');
    this.user = userData ? JSON.parse(userData) : null;
  }

  ngOnInit() {
    this.getListLocation();
  }

  async getListLocation(){
      this.loading = true;
      const signalGet : any = await this.locationService.getLocataires(this.user._id as string);
      console.log(signalGet);
      
      if(signalGet.status ==200){
        this.loading = false;
        this.listLocation = signalGet.data;
      }else{
        this.loading = false;
        this.notifs.openToastr(signalGet.message , "Get list Loaction" , 'error');
      }
  }

  async onGenerateCall(){
    this.loadCall=true;
    const signalCall : any = await this.locationService.generateCall(this.user._id as string);
    if(signalCall.status ==200){
      this.loadCall = false;
      this.notifs.openToastr("Tous locataires appélé" , "Generate call" , 'success');
    }else{
      this.loadCall = false;
      this.notifs.openToastr(signalCall.message , "Generate call" , 'error');
    }
  }

  async onDeleteLocation(idLocation : string){
    console.log("ID +>>", idLocation);
    
    this.loadDelete = true;
    const signalDelete : any = await this.locationService.deleteLocataire(idLocation);
    if(signalDelete.status ==200){
      const index = this.listLocation.findIndex((location : any)=> location.tenant._id == idLocation);
      if(index!=-1){
        this.listLocation = this.listLocation.filter((location: ILocataire, i: number) => i !== index);
      } 
      this.loadDelete = false;
      this.notifs.openToastr("Locataire supprimé avec success" , "Generate call" , 'success');
    }else{
      this.loadDelete = false;
      this.notifs.openToastr(signalDelete.message , "Generate call" , 'error');
    }
  }
}
