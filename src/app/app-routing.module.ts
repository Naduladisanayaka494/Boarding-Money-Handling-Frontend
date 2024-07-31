import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingnupComponent } from './auth/components/singnup/singnup.component';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  { path: 'register', component: SingnupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
