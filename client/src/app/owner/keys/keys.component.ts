import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AIOService } from 'src/app/shared/services/AIO/aio.service';
import { OwnerService } from 'src/app/shared/services/owner/owner.service';
import { SeoService } from 'src/app/shared/services/seo/seo.service'

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
  newKey: boolean = false;
  licenses: any = [];
  editingLicense: any = {};
  formEditLicense: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private http: OwnerService,
    private aio: AIOService,
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  async ngOnInit() {
    await this.getLicenses();
    this.generateFormGroup();
  }

  onChangeNewKey(status: boolean){
    this.newKey = status;
  }

  async getLicenses(){
    await this.http.getLicenses()
      .then( (w: any = [{}]) => {

        this.licenses = w.map(license => ({
          ...license,
          createdAt: this.aio.validDate(license.createdAt),
          expresIn: this.aio.validDate(license.expresIn)
        }))
        console.log(w);
      })
      .catch( e => {console.log(e)})
  }

  async deleteLicense(id: string){
    await this.http.deleteLicense(id)
      .then( async() => { await this.getLicenses() })
      .catch( e => { console.log(e) })
  }

  async onEditLicense(){
    await this.http.putLicense(this.formEditLicense.value)
      .then( async() => {await this.getLicenses(); this.formEditLicense.reset();})
      .catch( e => {console.log(e)} )
    this.editingLicense = {};
  }

  async editLicense(id){
    this.licenses.forEach(license => {
      if (license._id == id){
        this.editingLicense = license;
        this.generateFormGroup();
        return false;
      }
    });

  }

  onCancelEdit(){
    this.editingLicense = {};
    this.formEditLicense.reset();
  }

  generateFormGroup(){
    this.formEditLicense = new FormGroup({
      id: new FormControl( { value: this.editingLicense._id || '', disabled: false } ),
      user: new FormControl( { value: this.editingLicense.user || '', disabled: false } ),
      // key: new FormControl( { value: this.editingLicense.key || '', disabled: false } ),
      // createdAt: new FormControl( { value: this.editingLicense.createdAt || '', disabled: false } ),
      // owner: new FormControl( { value: this.editingLicense.owner || '', disabled: false } ),
      expresIn: new FormControl( { value: this.editingLicense.expresIn || '', disabled: false } ),
      status: new FormControl( { value: this.editingLicense.status || '', disabled: false } ),
      quantity: new FormControl( { value: this.editingLicense.quantity || '', disabled: false } )
    })
  }

}
