import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './shared/services/auth/auth.service';
import { OwnerService } from './shared/services/owner/owner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CactusManager';
  firstLoad: boolean = true;

  constructor(
    private http: OwnerService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ){}

  async ngOnInit(){
    this.spinner.show();
    if (localStorage.getItem('ownerAccessToken'))
      await this.http.getSelf()
        .then( (w: any = {}) =>{
          localStorage.setItem('userName', w.name);
          localStorage.setItem('userEmail', w.email);
        })
        .catch( e => {
          console.log(e);
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          if ( e.status == 401 )
            this.auth.ownerLogout();
        })
    this.firstLoad = false;
    this.spinner.hide();
  }

}
