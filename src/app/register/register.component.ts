import { Router } from '@angular/router';
import { UserService } from './../Services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private _userService: UserService, private _router:Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.minLength(2), Validators.required]),
      lastName: new FormControl('', [Validators.minLength(2), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required])
    });
  }


  Register() {
    //GetError and HasError not working
    // console.log(`Errors: ${this.registerForm.get('firstName')?.errors?.['minlength']}`);
    if (!this.registerForm.valid) {
      return;
    }
    this._userService.Register(this.registerForm.value);
    this._router.navigate(['login']);
  }



}
