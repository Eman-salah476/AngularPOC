import { Router } from '@angular/router';
import { UserService } from './../Services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string = '';
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  Submit() {
    let response = this._userService.ValidateUser(this.signInForm.get('userName').value, this.signInForm.get('password').value);
    if (response) {
      localStorage.setItem('UserToken',response);
      this._userService.GetUSerCredentials();
      this._router.navigate(['home']);
    }
    else {
      this.errorMessage = "UserName or Password is Invalid"
    }
  }

}
