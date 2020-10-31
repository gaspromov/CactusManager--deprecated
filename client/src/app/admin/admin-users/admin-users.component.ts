import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo/seo.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  newKey: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  ngOnInit(): void {
  }

  onChangeNewKey(status: boolean){
    this.newKey = status;
  }

}
