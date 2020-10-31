import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo/seo.service'

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
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
