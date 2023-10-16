import { NgModule } from "@angular/core";
import { CreateBienComponent } from "./create-bien/create-bien.component";
import { ListBienComponent } from "./list-bien/list-bien.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations : [CreateBienComponent , ListBienComponent],
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path : 'list',
                component : ListBienComponent,
            },
            {
                path : 'create',
                component : CreateBienComponent,
            },
            {
                path : 'edit/:idBien',
                component : CreateBienComponent,
            },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
        ])
    ],
    exports : []
})

export class BiensModule{}