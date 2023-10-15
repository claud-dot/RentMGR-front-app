import { NgModule } from "@angular/core";
import { CreateLocataireComponent } from "./create-locataire/create-locataire.component";
import { ListLocataireComponent } from "./list-locataire/list-locataire.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations : [CreateLocataireComponent , ListLocataireComponent],
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path : 'list',
                component : ListLocataireComponent,
            },
            {
                path : 'create',
                component : CreateLocataireComponent,
            },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
        ])
    ],
    exports : []
})

export class LocataireModule{}