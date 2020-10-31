import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
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
    private seo: SeoService,
    private auth: AuthService,
    private router: Router,
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

  async signUp(){
    if (this.signUpForm.valid)
      await this.auth.ownerSignUp(this.signUpForm.value)
        .then( (w: any) => {
          this.auth.setOwnerToken(w.accessToken);
          this.router.navigate(['/owner']);
        })
        .catch(e => {console.log(e);})
  }

}
