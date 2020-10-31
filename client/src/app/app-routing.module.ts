import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { KeysComponent } from './owner/keys/keys.component';
import { OwnerApiComponent } from './owner/owner-api/owner-api.component';
import { OwnerComponent } from './owner/owner/owner.component';


const routes: Routes = [

  //auth
  { path: 'login', component: SignInComponent, data: { title: 'Login - CactusManager' } },
  { path: 'sign-up', component: SignUpComponent, data: { title: 'SignUp - CactusManager' } },
  { path: 'admin-login', component: AdminAuthComponent },

  //owner
  { path: 'owner', component: OwnerComponent, children: [

    { path: 'keys', component: KeysComponent, data: { pageName:"Keys", title: 'Keys manage - CactusManager'} },
    { path: 'api', component: OwnerApiComponent, data: { pageName: 'API', title: 'API integration - CactusManager' } },
    { path: '**', redirectTo: 'keys' }

  ]},

  { path: 'admin', component: AdminComponent, children: [

    { path: 'users', component: AdminUsersComponent, data: { title: 'Users manage - admin CactusManager' } },
    { path: '**', redirectTo: 'users' }

  ] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
