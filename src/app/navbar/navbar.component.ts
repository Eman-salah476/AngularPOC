import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isValid: boolean = false;
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.userCredential.subscribe({
      next: (response) => {
        if (this._userService.userCredential.getValue() != null) {
          this.isValid = true;
        }
        else {
          this.isValid = false;
        }
      },
      error: (error) => console.log(error)
    })
  }

}
