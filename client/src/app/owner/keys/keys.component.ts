import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AIOService } from 'src/app/shared/services/AIO/aio.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
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

  
  filterParams = [
    {key: 'status', status: false, str: 'renewal'},
    {key: 'status', status: false, str: 'lifetime'}
  ]
  filterChange: boolean = false;

  searchParam: string = '';
  searchKeys = ['key', 'user', 'outputExpiresIn', 'createdAt']


  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private http: OwnerService,
    private aio: AIOService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
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
    this.spinner.show()
    await this.http.getLicenses()
      .then( (w: any = [{}]) => {

        this.licenses = w.map(license => ({
          ...license,
          createdAt: this.aio.outputDate(new Date(license.createdAt)),
          outputExpiresIn: this.aio.outputDate(new Date(license.expiresIn || '')) || '-' ,
          expiresIn: new Date(license.expiresIn || '') || ''
        }))
      this.spinner.hide()  
      })
      .catch( e => {
        if (e.status == 401){
          this.spinner.hide();
          this.auth.ownerLogout();
        }
        else{
          console.log(e)
          this.spinner.show()
        }
      })
  }

  async deleteLicense(id: string){
    this.spinner.show()
    await this.http.deleteLicense(id)
      .then( async() => { await this.getLicenses() })
      .catch( e => { 
        if (e.status == 401){
          this.spinner.hide()
          this.auth.adminLogout();
        }
        console.log(e) 
      })
  }

  async onEditLicense(){
    this.spinner.show()
    this.formEditLicense.value.expiresIn = this.formEditLicense.value.status == 'lifetime' ? new Date('2222-02-22') : this.formEditLicense.value.expiresIn;
    await this.http.putLicense(this.formEditLicense.value)
      .then( async() => {await this.getLicenses(); this.formEditLicense.reset(); this.editingLicense = {};})
      .catch( e => {
        this.spinner.hide()
        if (e.status == 401){
          this.auth.adminLogout();
        }
        console.log(e)
      } )
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
    this.formEditLicense.reset();
    this.editingLicense = {};
  }

  generateFormGroup(){

    this.formEditLicense = new FormGroup({
      id: new FormControl( { value: this.editingLicense._id || '', disabled: false } ),
      user: new FormControl( { value: this.editingLicense.user || '', disabled: false } ),
      expiresIn: new FormControl( { value: this.aio.validDate(this.editingLicense.expiresIn || ''), disabled: false } ),
      status: new FormControl( { value: this.editingLicense.status || '', disabled: false } ),
      quantity: new FormControl( { value: this.editingLicense.quantity, disabled: false } )
    })
  }

  onFilterChange(){
    this.filterChange = !this.filterChange;
  }

  search(){
    console.log('start')
  }
}
