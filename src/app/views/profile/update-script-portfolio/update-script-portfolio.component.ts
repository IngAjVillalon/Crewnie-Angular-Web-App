import { ActiveUser } from './../../../core/models/models';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';

export interface Fruit {
  name: string;
}


export interface portfolioItem {
  portfolioId?: string;
  portfolioType?: string;
  portfolioItemTitle?: string;
  portfolioThumb?: string;
  portfolioFile?: string;
  portfolioItemDate?: firebase.firestore.Timestamp;
  portfolioItemLocation?: string;
  portfolioItemDescription?: string;
  portfolioItemQuality?: boolean;
  portfolioItemCategories?: Array<string>;
  portfolioItemViews?: number;
  portfolioItemComments?: number;
  portfolioItemFavs?: number;
}

@Component({
  selector: 'app-update-script-portfolio',
  templateUrl: './update-script-portfolio.component.html',
  styleUrls: ['./update-script-portfolio.component.scss']
})
export class UpdateScriptPortfolioComponent implements OnInit {

  userId;
  currentUser$: AngularFirestoreDocument<ActiveUser>;
  currentUser: ActiveUser;

  scriptFile;
  thumbImage;

  portfolioThumbImageUrl;
  portfolioScriptUrl;

  thumbChanged: boolean;
  scriptFileChanged: boolean;

  portfolioId;
  portfolioItem$: AngularFirestoreDocument<portfolioItem>;
  portfolioItem: portfolioItem;

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
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.portfolioId = this.route.snapshot.queryParams["id"];
    this.userId = this.route.snapshot.queryParams["userId"];
    console.log(this.portfolioId);
    console.log(this.userId);

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

    this.portfolioItem$ = this.db
      .collection("users")
      .doc(this.userId)
      .collection("portfolio")
      .doc(this.portfolioId);
    this.portfolioItem$.valueChanges().subscribe(portfolio => {
      this.portfolioItem = portfolio;
      this.portfolioImageUrl = this.portfolioItem.portfolioThumb;
      // const datePipe = new DatePipe('en-US');
      // this.portfolioDate = datePipe.transform(this.portfolioItem.portfolioItemDate, 'EEEE, MMMM d');
      console.log(this.portfolioItem.portfolioItemDate);
      let d = new Date();
      const unixtime = d.valueOf();

      this.portfolioForm.patchValue({
        portfolioTitle: this.portfolioItem.portfolioItemTitle,
        portfolioDescription: this.portfolioItem.portfolioItemDescription,
        portfolioDate: this.portfolioItem.portfolioItemDate.toDate(),
        portfolioLocation: this.portfolioItem.portfolioItemLocation,
        portfolioQuality: this.portfolioItem.portfolioItemQuality,
        portfolioCategories: this.portfolioItem.portfolioItemCategories
      });

      this.fruits = this.portfolioItem.portfolioItemCategories;

      console.log(this.portfolioItem);

      this.portfolioThumbImageUrl = this.portfolioItem.portfolioThumb;



      setTimeout(()=>{
        var elmnt = document.getElementById('scriptPreview');
        var elementMobileScriptView = document.getElementById('mobileScriptView');
        if(elmnt) {
          elmnt.setAttribute('data', this.portfolioItem.portfolioFile);
        }

        if(elementMobileScriptView) {
          elementMobileScriptView.setAttribute('href', this.portfolioItem.portfolioFile);
          elementMobileScriptView.innerHTML = "TAP TO VIEW SCRIPT";
        }

      }, 1000);

    });

  this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));


  }

  ngOnInit() {
  }

  userID: String;
  user$: Observable<User>;
  user: User;

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

    // const id = this.db.createId();
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc('users/'+this.userId+'/portfolio/'+this.portfolioId);

    const data = {
      portfolioId:  this.portfolioId,
      portfolioType: 'script',
      portfolioThumb: this.portfolioThumbImageUrl,
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

    if (this.portfolioForm.get("portfolioTitle").touched) {
      data.portfolioItemTitle = this.portfolioForm.controls.portfolioTitle.value;
    }
    if (this.portfolioForm.get("portfolioDescription").touched) {
      data.portfolioItemDescription = this.portfolioForm.controls.portfolioDescription.value;
    }
    if (this.portfolioForm.get("portfolioLocation").touched) {
      data.portfolioItemLocation = this.portfolioForm.controls.portfolioLocation.value;
    }
    if (this.portfolioForm.get("portfolioDate").touched) {
      data.portfolioItemDate = this.portfolioForm.controls.portfolioDate.value;
    }
    if (this.portfolioForm.get("portfolioCategories").touched) {
      data.portfolioItemCategories = this.portfolioForm.controls.portfolioCategories.value;
    }
    if (this.portfolioForm.get("portfolioQuality").touched) {
      data.portfolioItemQuality = this.portfolioForm.controls.portfolioQuality.value;
    }

    console.log(data);

    userRef.update(data).then(() => {
      this.router.navigate(["/profile/portfolio"]);
    })
    .catch(_error => {
      console.log('Portfolio Not Saved', _error);
    });

  }

  selectThumbImage(event) {
    this.thumbImage = event.target.files[0];
    var type = this.thumbImage.type;
    var videoNode = document.querySelector('image');
    var fileURL = URL.createObjectURL(this.thumbImage);
    this.portfolioThumbImageUrl = URL.createObjectURL(this.thumbImage);
    // document.getElementById('videoThumb').innerHTML='src="'+fileURL+'';
    this.scriptFileChanged = true;
  }

  uploadThumbFile() {

    if(this.scriptFileChanged) {
      const path = `testZone/${new Date().getTime()}_${this.thumbImage.name}`;
      const customMetadata = { app: 'My AngularFire-powered PWA!' };
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
    }else {
      this.uploadScriptFile();
    }

  }

  selectFileToUpload(event) {
    this.scriptFile = event.target.files[0]
    var type = this.scriptFile.type
    var videoNode = document.querySelector('pdf');
    var fileURL = URL.createObjectURL(this.scriptFile)
    var elmnt = document.getElementById('portfolioScript');
    elmnt.setAttribute('data', fileURL);
    this.thumbChanged = true;
  }

  uploadScriptFile() {
    this.IsUploading = true;

    if(this.thumbChanged) {
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
    }else {
      this.addPortfolioItem();
    }

  }

}
