import { ActiveUser } from "src/app/core/models/models";
import { AuthService } from "src/app/core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Location, DatePipe } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";

export interface portfolioItem {
  portfolioId?: string;
  portfolioType?: string;
  portfolioThumb?: string;
  portfolioFile?: string;
  portfolioItemTitle?: string;
  portfolioItemDescription?: string;
  portfolioItemDate?: string;
  portfolioItemLocation?: string;
  portfolioItemQuality?: boolean;
  portfolioItemCategories?: Array<string>;
  portfolioItemViews?: number;
  portfolioItemComments?: number;
  portfolioItemFavs?: number;
}

@Component({
  selector: "app-view-image-portfolio",
  templateUrl: "./view-image-portfolio.component.html",
  styleUrls: ["./view-image-portfolio.component.scss"]
})
export class ViewImagePortfolioComponent implements OnInit {
  userId;
  currentUser$: AngularFirestoreDocument<ActiveUser>;
  currentUser: ActiveUser;

  portfolioId;
  portfolioItem$: AngularFirestoreDocument<portfolioItem>;
  portfolioItem: portfolioItem;

  constructor(
    private _location: Location,
    public sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private afStorage: AngularFireStorage
  ) {
    this.portfolioId = this.route.snapshot.queryParams["id"];
    this.userId = this.route.snapshot.queryParams["userId"];
    console.log(this.portfolioId);
    console.log(this.userId);

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
      console.log(this.portfolioItem);
    });
  }

  ngOnInit() {}

  goBack() {
    this._location.back();
  }

  updatePortfolioItem() {
    console.log('route update');
    this.router.navigate(["/update/image"], { queryParams: { userId: this.userId, id: this.portfolioItem.portfolioId } });
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
      .then(() =>
        this.goBack()
      );
  }

  AddComment() {

  }
}
