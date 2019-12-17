import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting} from './app.routing'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { UserService} from "./_services/user.service";
import { ProfileService} from "./_services/profile.service";
import {AlertComponent} from "./_directives/alert.component";
import {AlertService} from "./_services/alert.service";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import { GalleryComponent } from './gallery/gallery.component';
import {ImageService} from "./_services/image.service";
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    AlertComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule, AppRouting, FormsModule, HttpModule, Ng2CarouselamosModule, NgxSpinnerModule
  ],
  providers: [
    AuthGuard,
    UserService,
    AlertService,
    AuthenticationService,
    ProfileService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
