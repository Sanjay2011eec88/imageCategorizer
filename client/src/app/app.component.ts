import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "./_services/authentication.service";
import {Router} from "@angular/router";
import {AlertService} from "./_services/alert.service";
import {AuthGuard} from "./_guards/auth.guard";
import {ImageService} from "./_services/image.service";
import {ProfileService} from "./_services/profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  category='';
  noOfItemsInCart=0;
  constructor(
    private router: Router,
    private authService:AuthenticationService,
    private alertService: AlertService,
    private authGuard: AuthGuard,
    private imageService: ImageService,
    private profileService: ProfileService,
  ){}

  categoryList:string='';
  ngOnInit(){

  }

  logout() {
    this.authService.logout()
      .subscribe(
        data => {
          this.alertService.success('Logged Out', true);
          this.router.navigate(['login']);
        },
        error => {
          this.alertService.error(error);
        });
  }

  onChange(event): void {  // event will give you full breif of action
    const categoryId = event.target.value;
    console.log(categoryId);
    this.imageService.categorySelected.emit(categoryId);
  }

}
