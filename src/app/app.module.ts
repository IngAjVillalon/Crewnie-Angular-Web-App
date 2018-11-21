import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { MatInputModule } from "@angular/material";
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MatInputModule,
    AppRoutingModule,
    PasswordStrengthBarModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
