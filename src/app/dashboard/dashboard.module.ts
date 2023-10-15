import { Injectable , NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@Injectable({
    providedIn: 'root',
})

@NgModule({
    declarations: [LayoutComponent],
    exports: [RouterModule],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: 'user-space',
                component: LayoutComponent,
                children: [
                    {
                        path: 'bien',
                        loadChildren: () => import('./components/biens/biens.module').then((m) => m.BiensModule)
                    },
                    {
                        path: 'location',
                        loadChildren: () => import('./components/locataire/locataire.module').then((m) => m.LocataireModule)
                    },
                    { path: '', redirectTo: 'bien', pathMatch: 'full' },
                ]
            },
            { path: '', redirectTo: 'user-space/bien', pathMatch: 'full' },
            { path: '**', redirectTo: 'user-space/bien' },
        ]),
       
    ]
})
export class DashboardModule{}
