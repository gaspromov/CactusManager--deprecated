import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo/seo.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

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
    this.loginForm = new FormGroup({
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required])
    })
  }

  async login(){
      await this.auth.ownerLogin(this.loginForm.value)
        .then( (w: any) => {
          this.auth.setOwnerToken(w.accessToken);
          this.router.navigate(['/owner']);
        })
        .catch(e => {
          console.log(e)
          this.errorMessage = e.error.message;
        })
  }
}
