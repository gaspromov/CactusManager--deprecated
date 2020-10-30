import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      login: new FormControl({ value: '', disabled: false}, [Validators.required]),
      password: new FormControl({ value: '', disabled: false}, [Validators.required])
    })
  }

  login(){
    if (this.loginForm.valid)
      console.log(this.loginForm);
  }

}
