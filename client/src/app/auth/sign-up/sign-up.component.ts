import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo/seo.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService
  ) {
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [Validators.required]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required]),
      key: new FormControl({ value: '', disabled: false }, [Validators.required])
    })
  }

  signUp(){
    if (this.signUpForm.valid)
      console.log(this.signUpForm)
  }

}
