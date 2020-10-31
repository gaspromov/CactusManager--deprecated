import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { AIOService } from 'src/app/shared/services/AIO/aio.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-new-registr-key',
  templateUrl: './new-registr-key.component.html',
  styleUrls: ['./new-registr-key.component.css']
})
export class NewRegistrKeyComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  
  key: string = '';

  constructor(
    private aio: AIOService,
    private http: AdminService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
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

  newKey(){
    let key = this.aio.generateKey();
    this.http.newRegKey(key)
      .then(w => {
        this.key = key;
      })
      .catch(e => {
        if ( e.status == 401)
          this.auth.adminLogout();
        else console.log(e);
      })
  }

}
