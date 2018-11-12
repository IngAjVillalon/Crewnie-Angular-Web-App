import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";

import { ActiveUser } from "./../../../core/models/models";
import { Component, OnInit } from "@angular/core";
import {
  BrowserModule,
  SafeUrl,
  DomSanitizer
} from "@angular/platform-browser";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";

import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { User } from "firebase";
import { FormGroup, FormControl } from "@angular/forms";
import { finalize } from "rxjs/operators";

interface currentUser {
  uid?: string;
  email?: string;
  profilePic?: string;
  coverPhoto?: string;
  first_name?: string;
  last_name?: string;
  age?: number;
  profession?: string;
  address?: string;
  city?: string;
  languages?: string;
  company?: string;
  phone?: string;
  mobile?: string;
  agency?: string;
  union?: string;
  experience?: string;
  bio?: string;
}

@Component({
  selector: "app-basic-info",
  templateUrl: "./basic-info.component.html",
  styleUrls: ["./basic-info.component.scss"]
})
export class BasicInfoComponent implements OnInit {

  profileImageFile;
  coverImageFile;

  profilePhotoChanged:boolean = false;
  coverPhotoChanged:boolean = false;
  isUpdating:boolean = false;

  currentProfilePhotoUrl;
  currentCoverPhotoUrl;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;
  filePath;

  userID: String;
  user$: Observable<User>;
  currentUser$: AngularFirestoreDocument<ActiveUser>;
  user: User;
  currentUser: ActiveUser;

  order: any = {};
  authState: any = null;

  edit = false;
  coverPhoto: string =
    "https://firebasestorage.googleapis.com/v0/b/crewnie-test.appspot.com/o/cover-photo%2Fcover-photo.png?alt=media&token=f517768f-c699-464a-855c-79408f3d4426";
  profilePicture: any = "";
  profileUrl: Observable<string | null>;

  file;
  file2;
  firstName: string;
  lastName: string;
  email: string;
  uploadTask: AngularFireUploadTask;

  profileDataFrom = new FormGroup({
    email: new FormControl(""),
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    age: new FormControl(""),
    profession: new FormControl(""),
    address: new FormControl(""),
    city: new FormControl(""),
    languages: new FormControl(""),
    company: new FormControl(""),
    phone: new FormControl(""),
    mobile: new FormControl(""),
    agency: new FormControl(""),
    union: new FormControl(""),
    experience: new FormControl(""),
    bio: new FormControl("")
  });

  constructor(
    public sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private afStorage: AngularFireStorage
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(user.uid);
        console.log("got User");
        this.userID = user.uid;
        console.log(this.user.uid);

        this.currentUser$ = this.db.doc<ActiveUser>("users/" + this.userID);
        this.currentUser$.valueChanges().subscribe(user => {
          this.currentUser = user;
          this.email = user.email;
          this.profilePicture = user.profilePhotoUrl;
          console.log(this.currentUser.email);
          this.currentProfilePhotoUrl = this.currentUser.profilePhotoUrl;
          this.currentCoverPhotoUrl = this.currentUser.coverPhotoUrl;
          this.setCoveAndProfilePhoto(this.currentUser.coverPhotoUrl, this.currentUser.profilePhotoUrl);
        });
      }else {
        this.router.navigate(["/sessions/signin"]);
      }
    });
  }

  ngOnInit() {}

  private setCoveAndProfilePhoto(coverPhotoUrl: string, profilePhotoUrl: string) {
    setTimeout(()=>{
      var cover_img_element = document.getElementById('coverPhotoImage');
      var profile_img_element = document.getElementById('profilePhotoImage');
      if(cover_img_element) {
        cover_img_element.setAttribute('src', coverPhotoUrl);
      }
      if(profile_img_element) {
        profile_img_element.setAttribute('src', profilePhotoUrl);
      }
    }, 1000);
  }


  selectProfileImageFileToUpload(event) {
    this.profileImageFile = event.target.files[0]
    var type = this.profileImageFile.type
    var videoNode = document.querySelector('image');
    var fileURL = URL.createObjectURL(this.profileImageFile)
    var profile_img_element = document.getElementById('profilePhotoImage');
    if(profile_img_element) {
      profile_img_element.setAttribute('src', fileURL);
      this.profilePhotoChanged = true;
    }

  }

  selectCoverImageFileToUpload(event) {
    this.coverImageFile = event.target.files[0]
    var type = this.profileImageFile.type
    var videoNode = document.querySelector('image');
    var fileURL = URL.createObjectURL(this.coverImageFile)
    var profile_img_element = document.getElementById('coverPhotoImage');
    if(profile_img_element) {
      profile_img_element.setAttribute('src', fileURL);
      this.coverPhotoChanged = true;
    }

  }


  startProfileImageUpload() {
    const path = `portfolio/${new Date().getTime()}_${this.profileImageFile.name}`;
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    this.task = this.storage.upload(path, this.profileImageFile, { customMetadata });
    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url;
        this.currentProfilePhotoUrl = Url;
        console.log(Url);
        if(this.coverPhotoChanged) {
          this.startCoverImageUpload();
        }else {
          this.saveProfileData();
        }
      });
    });
  }

  startCoverImageUpload() {
    const path = `portfolio/${new Date().getTime()}_${this.coverImageFile.name}`;
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    this.task = this.storage.upload(path, this.coverImageFile, { customMetadata });
    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url;
        this.currentCoverPhotoUrl = Url;
        console.log(Url);
        this.saveProfileData();
      });
    });
  }


  editPage() {
    console.log(this.userID);
    this.profileDataFrom.controls["age"].setValue(this.currentUser.age);
    this.edit = true;
  }

  saveProfileData() {
    this.edit = false;

    if (this.profileDataFrom.get("email").touched) {
      this.currentUser.email = this.profileDataFrom.controls.email.value;
    }
    if (this.profileDataFrom.get("first_name").touched) {
      this.currentUser.firstName = this.profileDataFrom.controls.first_name.value;
    }
    if (this.profileDataFrom.get("last_name").touched) {
      this.currentUser.lastName = this.profileDataFrom.controls.last_name.value;
    }
    if (this.profileDataFrom.get("age").touched) {
      this.currentUser.age = this.profileDataFrom.controls.age.value;
    }
    if (this.profileDataFrom.get("profession").touched) {
      this.currentUser.mainProfession = this.profileDataFrom.controls.profession.value;
    }
    if (this.profileDataFrom.get("address").touched) {
      this.currentUser.address = this.profileDataFrom.controls.address.value;
    }
    // if (this.profileDataFrom.get("city").touched) {
    //   this.currentUser.city = this.profileDataFrom.controls.city.value;
    // }
    if (this.profileDataFrom.get("languages").touched) {
      this.currentUser.languages = this.profileDataFrom.controls.languages.value;
    }
    if (this.profileDataFrom.get("company").touched) {
      this.currentUser.company = this.profileDataFrom.controls.company.value;
    }
    if (this.profileDataFrom.get("bio").touched) {
      // this.currentUser.bio = this.profileDataFrom.controls.bio.value;
    }

    console.log(this.currentUser);
    // this.currentUser.coverPhoto = this.coverPhoto;

    this.db
      .collection("users")
      .doc(this.currentUser.uid)
      .update(this.currentUser).then(() => {
        this.isUpdating = false;
      });
  }

  saveProfileChanges() {
    this.isUpdating = true;
    if(this.profilePhotoChanged) {
      this.startProfileImageUpload();
    }else if(this.coverPhotoChanged) {
      this.startCoverImageUpload();
    }else {
      this.saveProfileData();
    }
  }

  cancelSavePage() {
    this.edit = false;
    if(this.profilePhotoChanged || this.coverPhotoChanged) {
      this.setCoveAndProfilePhoto(this.currentUser.coverPhotoUrl, this.currentUser.profilePhotoUrl);
    }
  }
}
