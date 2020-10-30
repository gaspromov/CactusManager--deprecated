import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { KeysComponent } from './owner/keys/keys.component';
import { OwnerApiComponent } from './owner/owner-api/owner-api.component';
import { OwnerComponent } from './owner/owner/owner.component';


const routes: Routes = [

  //auth
  { path: 'login', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'admin-login', component: AdminAuthComponent },

  //owner
  { path: 'owner', component: OwnerComponent, children: [

    { path: 'keys', component: KeysComponent, data: { pageName:"Keys"} },
    { path: 'api', component: OwnerApiComponent, data: {pageName: 'API'} },
    { path: '**', redirectTo: 'keys' }

  ]},

  { path: 'admin', redirectTo: 'admin-login' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
