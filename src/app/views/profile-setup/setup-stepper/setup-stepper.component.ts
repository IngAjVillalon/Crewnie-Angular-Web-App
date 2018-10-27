import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CoverPhotoDialogComponent } from '../cover-photo-dialog/cover-photo-dialog.component';
import { CoverLetterDialogComponent } from '../cover-letter-dialog/cover-letter-dialog.component';
import { ProfilePhotoDialogComponent } from '../profile-photo-dialog/profile-photo-dialog.component';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { ActiveUser, Order } from "../../../core/models/models";
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-setup-stepper',
  templateUrl: './setup-stepper.component.html',
  styleUrls: ['./setup-stepper.component.scss']
})
export class SetupStepperComponent implements OnInit {

  userID: string;
  user$: Observable<User>;
  currentUser$;
  // currentUser: ActiveUser;
  user: User;
  coverPhotoURL = 'assets/images/cover-photo-upload.png';
  profilePhotoURL = 'assets/images/profile-photo-upload.png';

  order: any = {};

  selectedStepIndex: number;

  selectTypeForm = new FormGroup({
    profileType: new FormControl("" , Validators.required),
    profileLabel: new FormControl("", Validators.required)
  });

  personalInfoForm  = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    nickName: new FormControl(""),
    gender: new FormControl(""),
    birthDate: new FormControl(""),
    age: new FormControl(""),
    address: new FormControl(""),
    email: new FormControl(""),
    company: new FormControl(""),
    experience: new FormControl(""),
    unionName: new FormControl(""),
    isUnion: new FormControl(""),
    languages: new FormControl(""),
    phoneNumberPersonal: new FormControl(""),
    mobileNumberPersonal: new FormControl(""),
    agreeTOC: new FormControl("")
  });

  carrierForm = new FormGroup({
    mainProfession: new FormControl(""),
    mainProfessionUnion: new FormControl(""),
    isMainProfessionUnion: new FormControl(""),
    mainProfessionCover: new FormControl("")
  });

  public profileTypeOptions = ['Director', 'Actor'];



  public profileForm= new FormGroup({
    profileEmail: new FormControl(""),
    profileLanguages: new FormControl(""),
    profileCompany: new FormControl(""),
    profilePhone: new FormControl(""),
    profileAge: new FormControl(""),
    profileAgency: new FormControl(""),
    profileMobile: new FormControl(""),
    profileUnion: new FormControl(""),
    profileExperience: new FormControl("")
  });
  public socialForm: FormGroup;


  first_name ="";
  last_name ="";
  age = "";
  profession ="";
  address ="";

  file;

  constructor(
    public sanitizer: DomSanitizer,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute,
  ) {


    this.afAuth.authState.subscribe(user => {
      if(user) {
        // this.uid = user.uid;
        console.log(user.uid);
        console.log("got User");
      this.userID = user.uid;
      console.log(this.userID);
      // Add Order To DB
      const docID = this.db.createId();
      this.order.uid = user.uid;
      this.order.email = user.email;

      } else {
        // Empty the value when user signs out
        // this.uid = null;
        console.log('userid not found');
      }
    });





   }

  ngOnInit() {

  }

  buildSelectTypeForm() {
    this.selectTypeForm = this.fb.group({
      profileType: ['', Validators.required]
    })
  }

  buildPersonalInfoForm() {
    this.personalInfoForm = this.fb.group({

    })
  }

  buildCarrierForm() {
    this.carrierForm = this.fb.group({

    })
  }

  buildProfileForm() {
    this.profileForm = this.fb.group({

    })
  }

  buildSocialForm() {
    this.socialForm = this.fb.group({

    })
  }

  changeProfileCoverPhoto()
  {
    const dialogRef = this.dialog.open(CoverPhotoDialogComponent, {
      width: '650px',
      // height: '650px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openCoverletterdialog() {
    const dialogRef = this.dialog.open(CoverLetterDialogComponent, {
      width: '650px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changeProfilePhoto()
  {
    const dialogRef = this.dialog.open(ProfilePhotoDialogComponent, {
      width: '450px',
      height: '515px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  // Footer jump fix
  stepAnimationDone(e) {
    console.log('animaiton done', this.selectedStepIndex);
    let footer:any = document.getElementsByClassName(`footer-${this.selectedStepIndex}`)[0];

    if(footer) {
      footer.style = 'opacity: 1;opacity: 1';
    } else {
      footer = document.getElementsByClassName(`footer-0`)[0];
      footer.style = 'display: block;opacity: 1';
    }

    console.log(this.selectTypeForm.controls.profileType.value);
    console.log(this.selectTypeForm.controls.profileLabel.value);

    this.first_name = this.personalInfoForm.controls.firstName.value;
    // console.log(this.personalInfoForm.controls.value);
  }

  selectionChange(e) {
    this.selectedStepIndex = e.selectedIndex;
    const footer:any = document.getElementsByClassName(`footer-${this.selectedStepIndex}`)[0];
    footer.style = 'opacity: 0;display: none';
  }

  public updateUserProfile() {


    console.log(this.selectTypeForm.controls.profileType.value);
    console.log(this.selectTypeForm.controls.profileLabel.value);

    console.log(this.personalInfoForm.controls.firstName.value);
    console.log(this.personalInfoForm.controls.lastName.value);
    console.log(this.personalInfoForm.controls.nickName.value);
    console.log(this.personalInfoForm.controls.gender.value);
    console.log(this.personalInfoForm.controls.birthDate.value);
    console.log(this.personalInfoForm.controls.age.value);
    console.log(this.personalInfoForm.controls.address.value);
    console.log(this.personalInfoForm.controls.email.value);
    console.log(this.personalInfoForm.controls.languages.value);
    console.log(this.personalInfoForm.controls.company.value);

    console.log(this.carrierForm.controls.mainProfession.value);
    console.log(this.carrierForm.controls.mainProfessionUnion.value);
    console.log(this.carrierForm.controls.isMainProfessionUnion.value);

    console.log(this.profileForm.controls.profileEmail.value);



    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc('users/'+this.userID);

    const data: ActiveUser = {
      uid:  this.userID,
      email: this.personalInfoForm.controls.email.value,
      profileType: this.selectTypeForm.controls.profileType.value,
      profileLabel: this.selectTypeForm.controls.profileLabel.value,
      firstName: this.personalInfoForm.controls.firstName.value,
      lastName: this.personalInfoForm.controls.lastName.value,
      nickName: this.personalInfoForm.controls.nickName.value,
      gender: this.personalInfoForm.controls.gender.value,
      birthDate: this.personalInfoForm.controls.birthDate.value,
      age: this.personalInfoForm.controls.age.value,
      address: this.personalInfoForm.controls.address.value,
      languages: this.personalInfoForm.controls.languages.value,
      company: this.personalInfoForm.controls.company.value,
      experiences: this.personalInfoForm.controls.experience.value,
      union: this.personalInfoForm.controls.unionName.value,
      phoneNumber: this.personalInfoForm.controls.phoneNumberPersonal.value,
      mobileNumber: this.personalInfoForm.controls.mobileNumberPersonal.value,

      mainProfession: this.carrierForm.controls.mainProfession.value,
      mainProfessionUnion: this.carrierForm.controls.mainProfessionUnion.value,
      mainProfessionCoverText: this.carrierForm.controls.mainProfessionCover.value,
      coverPhotoUrl: this.coverPhotoURL,
      profilePhotoUrl: this.profilePhotoURL,
      agency: this.profileForm.controls.profileAgency.value,
      // photoURL: user.photoURL,


    };

    console.log(data);

    return userRef.set(data, { merge: true }).then(() => {
      this.router.navigate(["/profile/info"]);
    })
    .catch(_error => {
      this.router.navigate(["/"]);
    });
  }

  public changeCoverPhoto(event: any) {
    this.file = event.target.files[0];
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = this.file;
    const filePath = "/cover-photo/" + id;
    const fileRef = this.afStorage.ref("cover-photo/"); // Add this line to get the path as a ref
    const task = this.afStorage.upload(filePath, this.file).then(() => {
      const ref = this.afStorage.ref(filePath);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url; // for ts
        this.coverPhotoURL = url; // with this you can use it in the html
        console.log(Url);
      });
    });
  }

  public changeProfilePic(event: any) {

    this.file = event.target.files[0];
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = this.file;
    const filePath = "/cover-photo/" + id;
    const fileRef = this.afStorage.ref("cover-photo/"); // Add this line to get the path as a ref
    const task = this.afStorage.upload(filePath, this.file).then(() => {
      const ref = this.afStorage.ref(filePath);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url; // for ts
        this.profilePhotoURL = url; // with this you can use it in the html
        console.log(Url);
      });
    });
  }

}
