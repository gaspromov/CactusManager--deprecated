import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeneratorService } from 'src/app/shared/services/generator/generator.service';

@Component({
  selector: 'app-new-key',
  templateUrl: './new-key.component.html',
  styleUrls: ['./new-key.component.css']
})
export class NewKeyComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  
  key: string = '';

  constructor(
    private generator: GeneratorService,
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
    let key = this.generator.generateKey();
    this.key = key;
  }
}
