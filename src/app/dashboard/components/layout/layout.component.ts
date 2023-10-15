import { Component, OnInit } from '@angular/core';
import { sideBarMenu } from 'src/app/config/side-menu.config';
import { IMenu } from 'src/app/interfaces/IMenu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  menuList !: IMenu[];

  constructor() { }

  ngOnInit() {
    this.menuList = sideBarMenu
  }

}
