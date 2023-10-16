import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { LoggedGuard } from './guard/logged.guard';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then(
        (m) => m.AuthModule
    ),
    canActivate : [LoggedGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
      canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
