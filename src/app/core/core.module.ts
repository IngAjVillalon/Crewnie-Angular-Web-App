import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavHelperDirective, MatSidenavTogglerDirective } from './directives/mat-sidebar/mat-sidenav.directive';


import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { SidenavLayoutComponent } from './components/sidenav-layout/sidenav-layout.component';
import { CommonMatsModule } from './modules/common-mats.module';
import {NgcFloatButtonModule} from 'ngc-float-button';

import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';


const declarations = [
  BlankLayoutComponent,
  SidenavLayoutComponent,
  MatSidenavHelperDirective,
  MatSidenavTogglerDirective
]

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CommonMatsModule,
    RouterModule,
    NgcFloatButtonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    PasswordStrengthBarModule,
    PdfViewerModule
  ],
  declarations: declarations,
  exports: [
    declarations,
    NgcFloatButtonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    PasswordStrengthBarModule
    ]
})
export class CoreModule { }
