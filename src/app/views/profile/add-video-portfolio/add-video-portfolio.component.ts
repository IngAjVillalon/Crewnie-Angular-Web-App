import { portfolioItem } from './../portfolio/portfolio.component';
import { ActiveUser } from './../../../core/models/models';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
// import { Credentials, S3, Config, config } from 'aws-sdk';
// import AWS = require('aws-sdk');


export interface Tags {
  name: string;
}

@Component({
  selector: 'app-add-video-portfolio',
  templateUrl: './add-video-portfolio.component.html',
  styleUrls: ['./add-video-portfolio.component.scss']
})
export class AddVideoPortfolioComponent implements OnInit {

  thumbImage;
  videoFile;

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;
  portfolioThumbImageUrl;
  portfolioVideoUrl;
  IsUploading: Boolean = false;

  // State for dropzone CSS toggling
  isHovering: boolean;

  portfolioImage;

  public portfolioForm= new FormGroup({
    portfolioTitle: new FormControl(""),
    portfolioDescription: new FormControl(""),
    portfolioDate: new FormControl(new Date()),
    portfolioLocation: new FormControl(""),
    portfolioQuality: new FormControl(""),
    portfolioCategories: new FormControl("")
  });

  userID: String;
  user$: Observable<User>;
  currentUser$: AngularFirestoreDocument<ActiveUser>;
  user: User;
  currentUser: ActiveUser;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['Video'];
  allTags: string[] = ['Pilot', 'Video', 'Audio', 'Script', 'Song'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;


  constructor(
    public sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router
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
        });
      }
    });

  this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

      this.portfolioThumbImageUrl = 'https://firebasestorage.googleapis.com/v0/b/crewnie-test.appspot.com/o/assets%2Fportfolio-place-holder.png?alt=media&token=fe9d9967-7fa8-48a0-b39a-b1be45431815';

   }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  fileEvent(fileInput: any) {


  }

  selectThumbImage(event) {
    this.thumbImage = event.target.files[0];
    var type = this.thumbImage.type;
    var videoNode = document.querySelector('image');
    var fileURL = URL.createObjectURL(this.thumbImage);
    this.portfolioThumbImageUrl = URL.createObjectURL(this.thumbImage);
    // document.getElementById('videoThumb').innerHTML='src="'+fileURL+'';
  }

  uploadThumbFile() {
    const path = `testZone/${new Date().getTime()}_${this.thumbImage.name}`;

    // // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // // The main task
    this.task = this.storage.upload(path, this.thumbImage, { customMetadata });
    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url; // for ts
        this.portfolioThumbImageUrl = Url; // with this you can use it in the html
        console.log(Url);
        return this.portfolioThumbImageUrl;
      });
    });
  }

  selectFileToUpload(event) {
    this.videoFile = event.target.files[0]
    var type = this.videoFile.type
    var videoNode = document.querySelector('video')
    var canPlay = videoNode.canPlayType(type)
    var fileURL = URL.createObjectURL(this.videoFile)
    document.getElementById('videoPreview').innerHTML='<source src="'+fileURL+'" type="video/mp4">';
    videoNode.load();
  }

  uploadVideoFile() {
    const path = `testZone/${new Date().getTime()}_${this.videoFile.name}`;

    // // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // // The main task
    this.task = this.storage.upload(path, this.videoFile, { customMetadata });
    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url; // for ts
        this.portfolioVideoUrl = Url; // with this you can use it in the html
        console.log(Url);
        this.addPortfolioItem();
      });
    });
  }

  uploadAllFiles() {
    this.IsUploading = true;
      this.uploadThumbFile();
      this.uploadVideoFile();
  }

  public addPortfolioItem() {
    // this.db
    // .collection("users")
    // .doc(this.currentUser.uid).collection('portfolio').update(this.currentUser);

    const id = this.db.createId();
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc('users/'+this.userID+'/portfolio/'+id);

    const data = {
      portfolioId:  id,      // photoURL: user.photoURL,
      portfolioUserId: this.currentUser.uid,
      portfolioType: 'video',
      portfolioThumb: this.portfolioThumbImageUrl,
      portfolioFile: this.portfolioVideoUrl,
      portfolioItemTitle: this.portfolioForm.controls.portfolioTitle.value,
      portfolioItemDescription: this.portfolioForm.controls.portfolioDescription.value,
      portfolioItemLocation: this.portfolioForm.controls.portfolioLocation.value,
      portfolioItemDate: this.portfolioForm.controls.portfolioDate.value,
      portfolioItemCategories: this.tags,
      portfolioItemQuality: this.portfolioForm.controls.portfolioQuality.value,
      portfolioItemViews: 0,
      portfolioItemComments: 0,
      portfolioItemFavs: 0,
    };

    console.log(data);

    userRef.set(data, { merge: true }).then(() => {
      this.IsUploading = false;
      this.router.navigate(["/profile/portfolio"]);
    })
    .catch(_error => {
      console.log('Portfolio Not Saved');
    });

  }

}
