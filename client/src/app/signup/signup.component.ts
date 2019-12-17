import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../_services/user.service";
import { AlertService} from "../_services/alert.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
  ) { }

  register() {
    this.loading = true;
    this.userService.signup(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          sessionStorage.setItem('currentUser', data.username);
          this.router.navigate(['profile']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
