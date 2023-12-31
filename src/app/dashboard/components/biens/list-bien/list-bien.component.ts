import { Component, OnInit } from '@angular/core';
import { BiensService } from 'src/app/dashboard/services/biens.service';
import { NotificationService } from 'src/app/dashboard/services/notification.service';
import { IBiens } from 'src/app/interfaces/IBiens';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-list-bien',
  templateUrl: './list-bien.component.html',
  styleUrls: ['./list-bien.component.css']
})
export class ListBienComponent implements OnInit {
  loading : boolean = false;
  loadDelete : boolean = false;
  user : IUser;
  listBien : IBiens[] = [];

  constructor(private bienService : BiensService , private notifs : NotificationService) {
    const userData = localStorage.getItem('current-user');
    this.user = userData ? JSON.parse(userData) : null;
  }

  ngOnInit() {
    this.getListBiens();
  }

  async getListBiens(){
      this.loading = true;
      const signalGet : any = await this.bienService.getBiens(this.user._id as string);
      console.log(signalGet);
      
      if(signalGet.status ==200){
        this.loading = false;
        this.listBien = signalGet.data;
      }else{
        this.loading = false;
        this.notifs.openToastr(signalGet.message , "Get list Biens" , 'error');
      }
  }

  async onDeleteBien(idBient : string){
    this.loadDelete = true;
    const signalDelete : any = await this.bienService.deleteBien(idBient);
    if(signalDelete.status ==200){
      const index = this.listBien.findIndex((bien : IBiens)=> bien._id == idBient);
      if(index!=-1){
        this.listBien= this.listBien.filter((bien: IBiens, i: number) => i !== index);
      }
      this.loadDelete = false;
      this.notifs.openToastr("Bien supprimé avec success" , "Generate call" , 'success');
    }else{
      this.loadDelete = false;
      this.notifs.openToastr(signalDelete.message , "Generate call" , 'error');
    }
  }

}
