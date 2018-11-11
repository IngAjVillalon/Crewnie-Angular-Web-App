import { AuthService } from './../../../core/services/auth.service';
import { ActiveUser } from './../../../core/models/models';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


export interface portfolioItem {
  portfolioId?: string;
  portfolioType?: string;
  portfolioItemTitle?: string;
  portfolioImage?: string;
  portfolioFile?: string;
  portfolioItemDate?: string;
  portfolioItemLocation?: string;
  portfolioItemDescription?: string;
  portfolioItemQuality?: boolean;
  portfolioItemCategories?: Array<string>;
  portfolioItemViews?: number;
  portfolioItemComments?: number;
  portfolioItemFavs?: number;

}

@Component({
  selector: 'app-view-script-portfolio',
  templateUrl: './view-script-portfolio.component.html',
  styleUrls: ['./view-script-portfolio.component.scss']
})
export class ViewScriptPortfolioComponent implements OnInit {

  userId;
  currentUser$: AngularFirestoreDocument<ActiveUser>;
  public currentUser: ActiveUser;


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
    this.portfolioId = this.route.snapshot.queryParams['id'];
    this.userId = this.route.snapshot.queryParams['userId'];
    console.log(this.portfolioId);
    console.log(this.userId);

    this.currentUser$ = this.db.doc<ActiveUser>("users/" + this.userId);
    this.currentUser$.valueChanges().subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser.displayName);
    });


    this.portfolioItem$ = this.db.collection('users').doc(this.userId).collection('portfolio').doc(this.portfolioId);
    this.portfolioItem$.valueChanges().subscribe(portfolio => {
      this.portfolioItem = portfolio;
      console.log(this.portfolioItem);
      setTimeout(()=>{
        var elmnt = document.getElementById('scriptPreview');
        elmnt.setAttribute('data', this.portfolioItem.portfolioFile);
      }, 1000)
    });
  }

  ngOnInit() {
  }


  goBack() {
    this._location.back();
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

}
