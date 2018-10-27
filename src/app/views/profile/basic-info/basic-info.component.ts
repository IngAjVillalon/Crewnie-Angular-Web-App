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
  profilePicture: any =
    "";

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
        });
      }
    });
  }

  ngOnInit() {}

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
        this.currentUser.coverPhotoUrl = url; // with this you can use it in the html
        console.log(Url);
      });
    });


  }

  public changeProfilePic(event: any) {

    var url: any;

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.profilePicture = reader.result;

      reader.readAsDataURL(file);
  }

    this.file = event.target.files[0];
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = this.file;
    this.filePath = "/cover-photo/" + id;
    const fileRef = this.afStorage.ref("cover-photo/"); // Add this line to get the path as a ref
    this.uploadTask = this.afStorage.upload(this.filePath, this.file);
    this.uploadTask.pause();
    this.uploadProgress = this.uploadTask.percentageChanges();
    console.log(this.uploadProgress);

    // then(() => {
    //   const ref = this.afStorage.ref(filePath);
    //   const downloadURL = ref.getDownloadURL().subscribe(url => {
    //     const Url = url; // for ts
    //     this.currentUser.profilePhotoUrl = url; // with this you can use it in the html
    //     console.log(Url);
    //   });
    // });
  }

  uploadProfilePhoto() {
    this.uploadTask.resume()
    console.log(this.uploadProgress);
    const ref = this.afStorage.ref(this.filePath);
    const downloadURL = ref.getDownloadURL().subscribe(url => {
          const Url = url; // for ts
          this.currentUser.profilePhotoUrl = url; // with this you can use it in the html
          console.log(Url);
        });
  }

  public saveCoverPhoto(event: any) {
    this.file2 = event.target.files[0];
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
        this.currentUser.coverPhotoUrl = url; // with this you can use it in the html
        console.log(Url);
      });
    });
  }

  public saveProfilePhoto() {
    console.log(this.profilePicture);

    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = this.file;
    const filePath = "/cover-photo";
    const fileRef = this.afStorage.ref(filePath); // Add this line to get the path as a ref
    const task = this.afStorage.upload(filePath, this.file);
    this.downloadURL = fileRef.getDownloadURL();
    this.downloadURL.subscribe(url => {
      this.profilePicture = url;
      console.log(url);
    });
  }

  editPage() {
    console.log(this.userID);
    this.profileDataFrom.controls["age"].setValue(this.currentUser.age);
    this.edit = true;
  }

  savePage() {
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
    // this.currentUser.profilePic = this.profilePicture;
    // this.currentUser.coverPhoto = this.coverPhoto;

    this.db
      .collection("users")
      .doc(this.currentUser.uid)
      .update(this.currentUser);
  }
}
