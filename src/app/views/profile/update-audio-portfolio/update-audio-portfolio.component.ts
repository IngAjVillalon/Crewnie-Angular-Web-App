import { ActiveUser, portfolioItem } from './../../../core/models/models';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { ProjectService } from 'src/app/core/services/project.service';

export interface Tags {
  name: string;
}




@Component({
  selector: 'app-update-audio-portfolio',
  templateUrl: './update-audio-portfolio.component.html',
  styleUrls: ['./update-audio-portfolio.component.scss']
})
export class UpdateAudioPortfolioComponent implements OnInit {

  portfolioId;
  userId;

  portfolioItem$: AngularFirestoreDocument<portfolioItem>;
  portfolioItem: portfolioItem;

  portfolioThumbImageUrl;
  portfolioAudioUrl;

  thumbChanged:boolean = false;
  fileChanged:boolean = false;

  thumbImage;
  videoFile;

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

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
  tags: string[] = [];
  allTags: string[] = ['Pilot', 'Video', 'Audio', 'Script', 'Song'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;


  constructor(
    public sanitizer: DomSanitizer,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public projectService: ProjectService
  ) {

    // Catch Url Parameter
    this.portfolioId = this.route.snapshot.queryParams["id"];
    this.userId = this.route.snapshot.queryParams["userId"];


    this.currentUser$ = this.db.doc<ActiveUser>("users/" + this.userID);
    this.currentUser$.valueChanges().subscribe(user => {
      this.currentUser = user;
    });

    this.portfolioItem$ = this.db
    .collection("users")
    .doc(this.userId)
    .collection("portfolio")
    .doc(this.portfolioId);

    this.portfolioItem$.valueChanges().subscribe(portfolio => {
      this.portfolioItem = portfolio;
      this.portfolioThumbImageUrl = this.portfolioItem.portfolioThumb;
      this.portfolioAudioUrl = this.portfolioItem.portfolioFile;
      this.tags = this.portfolioItem.portfolioItemCategories;
      setTimeout(() => {
        var elmnt = document.getElementById("myAudio");
        var elmnt2 = document.getElementById("myAudio2");

        if(elmnt) {
          elmnt.setAttribute("src", this.portfolioItem.portfolioFile);
        }
        if(elmnt2) {
          elmnt2.setAttribute("src", this.portfolioItem.portfolioFile);
        }


        this.portfolioForm.patchValue({
          portfolioTitle: this.portfolioItem.portfolioItemTitle,
          portfolioDescription: this.portfolioItem.portfolioItemDescription,
          portfolioDate: this.portfolioItem.portfolioItemDate.toDate(),
          portfolioLocation: this.portfolioItem.portfolioItemLocation,
          portfolioQuality: this.portfolioItem.portfolioItemQuality,
          portfolioCategories: this.portfolioItem.portfolioItemCategories
        });

      }, 1000);

    });

  this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

      this.portfolioThumbImageUrl = 'https://firebasestorage.googleapis.com/v0/b/crewnie-test.appspot.com/o/assets%2Fimage-placeholder.png?alt=media&token=55096cfb-5a07-41b7-90a4-20630b7c021a';
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
    this.thumbChanged = true;
    this.thumbImage = event.target.files[0];
    var type = this.thumbImage.type;
    var videoNode = document.querySelector('image');
    var fileURL = URL.createObjectURL(this.thumbImage);
    this.portfolioThumbImageUrl = URL.createObjectURL(this.thumbImage);
    this.openSnackBar('New Thumb Artwork Selected', 'ok');
  }

  uploadThumbFile() {
    const path = `testZone/${new Date().getTime()}_${this.thumbImage.name}`;
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    this.task = this.storage.upload(path, this.thumbImage, { customMetadata });
    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url; // for ts
        this.portfolioThumbImageUrl = Url; // with this you can use it in the html
        console.log(Url);
        if(this.fileChanged) {
          this.uploadVideoFile();
        }else {
          this.addPortfolioItem();
        }
      });
    });
  }

  selectFileToUpload(event) {
    this.fileChanged = true;
    this.videoFile = event.target.files[0];
    var type = this.videoFile.type;
    var videoNode = document.querySelector('audio');
    var canPlay = videoNode.canPlayType(type);
    var fileURL = URL.createObjectURL(this.videoFile);
    document.getElementById('myAudio').innerHTML='<source src="'+fileURL+'" type="audio/mp3">';
    videoNode.load();
    this.openSnackBar('New Audio File Selected', 'ok');
  }

  uploadVideoFile() {
    const path = `testZone/${new Date().getTime()}_${this.videoFile.name}`;
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    this.task = this.storage.upload(path, this.videoFile, { customMetadata });
    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url;
        this.portfolioAudioUrl = Url;
        console.log(Url);
        this.addPortfolioItem();
      });
    });
  }

  uploadAllFiles() {
    this.IsUploading = true;

    if(this.thumbChanged) {
      this.uploadThumbFile();
    }else if(this.fileChanged) {
      this.uploadVideoFile();
    }else {
      this.addPortfolioItem();
    }

  }

  public addPortfolioItem() {
    const userRef: AngularFirestoreDocument<any> = this.db.doc('users/'+this.userId+'/portfolio/'+this.portfolioId);

    const data = {
      portfolioId:  this.portfolioId,
      portfolioUserId: this.portfolioItem.portfolioUserId,
      portfolioType: 'audio',
      portfolioThumb: this.portfolioThumbImageUrl,
      portfolioFile: this.portfolioAudioUrl,
      portfolioItemTitle: this.portfolioForm.controls.portfolioTitle.value,
      portfolioItemDescription: this.portfolioForm.controls.portfolioDescription.value,
      portfolioItemLocation: this.portfolioForm.controls.portfolioLocation.value,
      portfolioItemDate: this.portfolioForm.controls.portfolioDate.value,
      portfolioItemCategories: this.tags,
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
      this.openSnackBar('Portfolio Item Updated', 'ok');
      this.IsUploading = false;
    })
    .catch(_error => {
      console.log('Portfolio Not Saved', _error);
      this.openSnackBar('Portfolio Not Saved', 'ok');
    });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
