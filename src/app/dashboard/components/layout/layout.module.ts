import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { CommonModule } from "@angular/common";
import { DashboardModule } from "../../dashboard.module";

@NgModule({
  imports : [
    CommonModule,
    DashboardModule
  ]
})

export class LayoutModule{}
