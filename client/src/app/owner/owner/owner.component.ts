import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OwnerService } from 'src/app/shared/services/owner/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  constructor(
    private http: OwnerService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) { 
    
  }

  async ngOnInit() {
     
  }

}
