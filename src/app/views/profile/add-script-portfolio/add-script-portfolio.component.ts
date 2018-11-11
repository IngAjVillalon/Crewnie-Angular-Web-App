import { ActiveUser } from './../../../core/models/models';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';


export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-add-script-portfolio',
  templateUrl: './add-script-portfolio.component.html',
  styleUrls: ['./add-script-portfolio.component.scss']
})
export class AddScriptPortfolioComponent implements OnInit {

  scriptFile;
  thumbImage;

  portfolioThumbImageUrl;
  portfolioScriptUrl;

  IsUploading: Boolean = false;
  uploadProgress: number = 0;
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;
  portfolioImageUrl;

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

  this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

      this.portfolioThumbImageUrl = 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image';
  }

  ngOnInit() {
  }

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
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Script'];
  allFruits: string[] = ['Pilot', 'Video', 'Audio', 'Script', 'Song'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    const reader = new FileReader();
    reader.onload = e => (this.portfolioImageUrl = reader.result);
    console.log(this.portfolioImage);
    reader.readAsDataURL(file);

    // The storage path
    const path = `portfolio/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url;
        this.portfolioImageUrl = Url;
        console.log(Url);
      });
    });

  }


  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  // Update Database for portfolio info
  uploadAndSavePortfolio() {
    this.IsUploading = true;
    this.uploadThumbFile();
  }

  public addPortfolioItem() {

    const id = this.db.createId();
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc('users/'+this.userID+'/portfolio/'+id);

    const data = {
      portfolioId:  id,
      portfolioType: 'script',
      portfolioImage: this.portfolioThumbImageUrl,
      portfolioFile: this.portfolioScriptUrl,
      portfolioItemTitle: this.portfolioForm.controls.portfolioTitle.value,
      portfolioItemDescription: this.portfolioForm.controls.portfolioDescription.value,
      portfolioItemLocation: this.portfolioForm.controls.portfolioLocation.value,
      portfolioItemDate: this.portfolioForm.controls.portfolioDate.value,
      portfolioItemCategories: this.fruits,
      portfolioItemQuality: this.portfolioForm.controls.portfolioQuality.value,
      portfolioItemViews: 0,
      portfolioItemComments: 0,
      portfolioItemFavs: 0

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
        this.uploadScriptFile();
      });
    });
  }

  selectFileToUpload(event) {
    this.scriptFile = event.target.files[0]
    var type = this.scriptFile.type
    var videoNode = document.querySelector('pdf');
    var fileURL = URL.createObjectURL(this.scriptFile)
    var elmnt = document.getElementById('portfolioScript');
    elmnt.setAttribute('data', fileURL);
  }

  uploadScriptFile() {
    this.IsUploading = true;
    const path = `testZone/${new Date().getTime()}_${this.scriptFile.name}`;
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    this.task = this.storage.upload(path, this.scriptFile, { customMetadata });
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url;
        this.portfolioScriptUrl = Url;
        console.log(Url);
        this.addPortfolioItem();
      });
    });
  }

}
