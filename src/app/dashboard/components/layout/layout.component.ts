import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';
import { sideBarMenu } from 'src/app/config/side-menu.config';
import { IMenu } from 'src/app/interfaces/IMenu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  menuList !: IMenu[];
  showSideBar : boolean = false;
  currentlyOpenItemIndex: number = -1;
  currentUrl !:string;

  constructor(private authService : AuthService , private router : Router) {
    this.currentUrl = this.router.url;
  }

  ngOnInit() {
    this.menuList = sideBarMenu;
    this.currentUrl = this.router.url;
    console.log(this.currentUrl , "Crrent");
    
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    
    if (sidebarCollapse) {
      sidebarCollapse.addEventListener('click', () => {

        this.showSideBar = !this.showSideBar;
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
          if (this.showSideBar) {
            sidebar.classList.add('active');
          } else {
            sidebar.classList.remove('active');
          }
        }
      });
    }
  }

  onLogOut(){
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

  toggleCollapse(index: number) {
    if (this.currentlyOpenItemIndex === index) {
      this.currentlyOpenItemIndex = -1; // Fermez l'élément actuel s'il est déjà ouvert
    } else {
      this.currentlyOpenItemIndex = index; // Ouvrez l'élément cliqué
    }
  }

  isActive(route: string) {
    return this.router.url == route;
  }
  

}
