import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AIOService } from 'src/app/shared/services/AIO/aio.service';
import { OwnerService } from 'src/app/shared/services/owner/owner.service';

@Component({
  selector: 'app-new-key',
  templateUrl: './new-key.component.html',
  styleUrls: ['./new-key.component.css']
})
export class NewKeyComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  
  key: string = '';
  formDataKey: FormGroup; 
  status = new FormControl({ value: 'lifetime', disabled: false });

  constructor(
    private aio: AIOService,
    private http: OwnerService,
  ) { }

  ngOnInit(): void {
    this.formDataKey = new FormGroup({
      status: this.status,
      user: new FormControl({value: '', disabled: false}, [Validators.required]),
      quantity: new FormControl({value: '', disabled: false}, [ Validators.required ]),
      expresIn: new FormControl({value: '', disabled: false}),
      key: new FormControl({ value: '', disabled: false })
    })
  }

  copy(id){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = document.getElementById('key').innerHTML;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  close(){
    this.onClose.emit(false);
  }

  async newKey(){
    this.formDataKey.value.expresIn = new Date(this.formDataKey.value.expresIn);
    this.formDataKey.value.key = this.aio.generateKey();

    await this.http.postNewLicense(this.formDataKey.value)
      .then( (w: any) => {
        this.key = this.formDataKey.value.key;
      })
      .catch( e => {
        console.log(e);
      })

  }
}
