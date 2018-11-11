import { Location, DatePipe } from "@angular/common";
import { ActiveUser, portfolioItem } from "src/app/core/models/models";
import { AuthService } from "src/app/core/services/auth.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { FormControl, FormGroup } from "@angular/forms";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Observable } from "rxjs/Observable";
import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from "@angular/material";
import { startWith, map } from "rxjs/operators";
import { Timestamp } from "rxjs";

@Component({
  selector: "app-update-image-portfolio",
  templateUrl: "./update-image-portfolio.component.html",
  styleUrls: ["./update-image-portfolio.component.scss"]
})
export class UpdateImagePortfolioComponent implements OnInit {
  userId;
  currentUser$: AngularFirestoreDocument<ActiveUser>;
  currentUser: ActiveUser;

  portfolioId;
  portfolioItem$: AngularFirestoreDocument<portfolioItem>;
  portfolioItem: portfolioItem;

  imageFile;
  fileChanged: boolean = false;
  isUploading: boolean = false;
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
  portfolioDate;

  public portfolioForm = new FormGroup({
    portfolioTitle: new FormControl(""),
    portfolioDescription: new FormControl(""),
    portfolioDate: new FormControl(""),
    portfolioLocation: new FormControl(""),
    portfolioQuality: new FormControl(""),
    portfolioCategories: new FormControl("")
  });

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ["Image"];
  allFruits: string[] = ["Pilot", "Video", "Audio", "Script", "Song"];

  @ViewChild("fruitInput")
  fruitInput: ElementRef<HTMLInputElement>;

  constructor(
    private _location: Location,
    public sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {
    this.portfolioId = this.route.snapshot.queryParams["id"];
    this.userId = this.route.snapshot.queryParams["userId"];
    console.log(this.portfolioId);
    console.log(this.userId);

    this.portfolioImageUrl =
      "https://firebasestorage.googleapis.com/v0/b/crewnie-test.appspot.com/o/assets%2Fportfolio-place-holder.png?alt=media&token=fe9d9967-7fa8-48a0-b39a-b1be45431815";

    this.currentUser$ = this.db.doc<ActiveUser>("users/" + this.userId);
    this.currentUser$.valueChanges().subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser.displayName);
    });

    this.portfolioItem$ = this.db
      .collection("users")
      .doc(this.userId)
      .collection("portfolio")
      .doc(this.portfolioId);
    this.portfolioItem$.valueChanges().subscribe(portfolio => {
      this.portfolioItem = portfolio;
      this.portfolioImageUrl = this.portfolioItem.portfolioFile;
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

      setTimeout(()=>{
        var elmnt = document.getElementById('portfolioFileImage');
        if(elmnt) {
          elmnt.setAttribute('src', this.portfolioItem.portfolioFile);
        }

      }, 1000)

      console.log(this.portfolioItem);

    });

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map(
        (fruit: string | null) =>
          fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  ngOnInit() {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
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
    this.fruitInput.nativeElement.value = "";
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  // Drag-&-Drop Methods

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    const reader = new FileReader();
    reader.onload = e => (this.portfolioImageUrl = reader.result);
    console.log(this.portfolioImage);
    reader.readAsDataURL(file);

    // Client-side validation example
    if (file.type.split("/")[0] !== "image") {
      console.error("unsupported file type :( ");
      return;
    }

    // The storage path
    const path = `portfolio/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: "My AngularFire-powered PWA!" };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    this.task.then(() => {
      const ref = this.storage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url; // for ts
        this.portfolioImageUrl = Url; // with this you can use it in the html
        console.log(Url);
      });
    });
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  goBack() {
    this._location.back();
  }

  updatePortfolioItem() {
    // this.router.navigate(["/profile/portfolio/update/image"], { queryParams: { userId: this.userId, id: this.portfolioItem.portfolioId } });
  }

  deletePortfolioItem() {
    this.db
      .collection("users")
      .doc(this.userId)
      .collection("portfolio")
      .doc(this.portfolioId)
      .delete()
      .catch(error => {
        console.log(error);
      })
      .then(() => this.goBack());
  }

  selectFileToUpload(event) {
    this.fileChanged = true;
    this.imageFile = event.target.files[0]
    var type = this.imageFile.type
    var videoNode = document.querySelector('image');
    var fileURL = URL.createObjectURL(this.imageFile)
    var elmnt = document.getElementById('portfolioFileImage');
    elmnt.setAttribute('src', fileURL);
  }

  startFileUpload() {
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

  public addPortfolioItem() {

    const id = this.portfolioItem.portfolioId;
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      "users/" + this.userId + "/portfolio/" + id
    );

    const data = {
      portfolioId: id,
      portfolioType: "image",
      portfolioThumb: this.portfolioImageUrl,
      portfolioFile: this.portfolioImageUrl,
      portfolioItemTitle: this.portfolioItem.portfolioItemTitle,
      portfolioItemDescription: this.portfolioItem.portfolioItemDescription,
      portfolioItemLocation: this.portfolioItem.portfolioItemLocation,
      portfolioItemDate: this.portfolioItem.portfolioItemDate,
      portfolioItemCategories: this.portfolioItem.portfolioItemCategories,
      portfolioItemQuality: this.portfolioItem.portfolioItemQuality,
      portfolioItemViews: this.portfolioItem.portfolioItemViews,
      portfolioItemComments: this.portfolioItem.portfolioItemComments,
      portfolioItemFavs: this.portfolioItem.portfolioItemFavs
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

    userRef
      .update(data)
      .then(() => {
        this.router.navigate(["/profile/portfolio"]);
      })
      .catch(_error => {
        console.log("Portfolio Not Saved", _error);
      });
  }

  savePortfolio() {
    this.isUploading = true;
    if(this.fileChanged) {
      this.startFileUpload();
    }else {
      this.addPortfolioItem();
    }

  }
}
