import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'firebase';
import { ActiveUser } from 'src/app/core/models/models';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-add-image-portfolio',
  templateUrl: './add-image-portfolio.component.html',
  styleUrls: ['./add-image-portfolio.component.scss']
})

export class AddImagePortfolioComponent implements OnInit {

  IsUploading: Boolean = false;
  uploadProgress: number = 0;

  imageFile;

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
  fruits: string[] = ['Image'];
  allFruits: string[] = ['Pilot', 'Video', 'Audio', 'Script', 'Song'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

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

        this.portfolioImageUrl = 'https://firebasestorage.googleapis.com/v0/b/crewnie-test.appspot.com/o/assets%2Fportfolio-place-holder.png?alt=media&token=fe9d9967-7fa8-48a0-b39a-b1be45431815';

        setTimeout(()=>{
          var elmnt = document.getElementById('portfolioFileImage');
          var elmnt2 = document.getElementById('portfolioFileImage2');
          if(elmnt) {
            elmnt.setAttribute('src', this.portfolioImageUrl);
          }
          if(elmnt2) {
            elmnt2.setAttribute('src', this.portfolioImageUrl);
          }

        }, 1000)
  }


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


  // Drag-&-Drop Methods

  toggleHover(event: boolean) {
    this.isHovering = event;
  }




  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }



  selectFileToUpload(event) {
    this.imageFile = event.target.files[0]
    var type = this.imageFile.type
    var videoNode = document.querySelector('image');
    var fileURL = URL.createObjectURL(this.imageFile)
    var elmnt = document.getElementById('portfolioFileImage');
    var elmnt2 = document.getElementById('portfolioFileImage2');
    if(elmnt) {
      elmnt.setAttribute('src', fileURL);
    }

    if(elmnt2) {
      elmnt2.setAttribute('src', fileURL);
    }

  }

  saveImagePortfolio() {
    this.IsUploading = true;
    this.startImageUpload();
  }

  startImageUpload() {
    const path = `portfolio/${new Date().getTime()}_${this.imageFile.name}`;
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    this.task = this.storage.upload(path, this.imageFile, { customMetadata });
    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url;
        this.portfolioImageUrl = Url;
        console.log(Url);
        this.addPortfolioItem()
      });
    });

  }

  // Update Database for portfolio info
  public addPortfolioItem() {

    const id = this.db.createId();
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc('users/'+this.userID+'/portfolio/'+id);

    const data = {
      portfolioId:  id,
      portfolioUserId: this.currentUser.uid,
      portfolioType: 'image',
      portfolioThumb: this.portfolioImageUrl,
      portfolioFile: this.portfolioImageUrl,
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
}
