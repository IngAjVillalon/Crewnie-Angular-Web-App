import { ActiveUser } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ViewVideoPortfolioComponent } from './../view-video-portfolio/view-video-portfolio.component';
import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';

export interface Tag {
  name: string;
}

export interface portfolioItems {
  title: string;
  views: number;
  day: number;
  tags: Array<String>;
}

export interface portfolioItem {
  portfolioId?: string;
  portfolioType?: string;
  portfolioThumb?: string;
  portfolioFile?: string;
  portfolioItemTitle?: string;
  portfolioItemDescription?: string;
  portfolioItemDate?: firebase.firestore.Timestamp;
  portfolioItemLocation?: string;
  portfolioItemQuality?: boolean;
  portfolioItemCategories?: Array<string>;
  portfolioItemViews?: number;
  portfolioItemComments?: number;
  portfolioItemFavs?: number;

}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  isAllProtfolio: Boolean = true;
  isVideo: Boolean = false;
  isImage: Boolean = false;
  isAudio: Boolean = false;
  isScript: Boolean = false;
  isAudioWide: Boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tag[] = [];

  userID: string;
  user$: Observable<User>;
  currentUser$: AngularFirestoreDocument<ActiveUser>;
  user: User;
  currentUser: ActiveUser;

  portfolios$: AngularFirestoreCollection<portfolioItem>;
  portfolios: portfolioItem[];
  filteredPortfolios: portfolioItem[];

  constructor(
    public sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.userID = user.uid;
        console.log('UserID'+this.userID);

        this.portfolios$ = this.db.collection('users').doc(this.userID).collection('portfolio');
        this.portfolios$.valueChanges().subscribe(portfolios => {
          this.portfolios = portfolios;
          this.filteredPortfolios = portfolios;
        });

      }
    });
  }

  ngOnInit() {}


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
      this.filterPortfolioItems()
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  remove(fruit: Tag): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.filterPortfolioItems()
  }

  selectPortfolio(portfolio: number) {
    this.isAllProtfolio = false;
    this.isImage = false;
    this.isVideo = false;
    this.isAudio = false;
    this.isScript = false;

    if( portfolio === 0) {
      this.isAllProtfolio = true;
      this.filteredPortfolios = this.portfolios;
    }else if(portfolio === 1) {
      this.isImage = true;
      this.filteredPortfolios = ('image') ? this.portfolios.filter(p=> p.portfolioType.toLocaleLowerCase().includes('image')) : this.portfolios;
    }else if(portfolio === 2) {
      this.isVideo = true;
      this.filteredPortfolios = ('video') ? this.portfolios.filter(p=> p.portfolioType.toLocaleLowerCase().includes('video')) : this.portfolios;
    }else if(portfolio === 3) {
      this.isAudio = true;
      this.filteredPortfolios = ('audio') ? this.portfolios.filter(p=> p.portfolioType.toLocaleLowerCase().includes('audio')) : this.portfolios;
    }else if(portfolio === 4) {
      this.isScript = true;
      this.filteredPortfolios = ('script') ? this.portfolios.filter(p=> p.portfolioType.toLocaleLowerCase().includes('script')) : this.portfolios;
    }


  }

  selectPortfolioItemWide(isWide: number) {
    if(isWide == 0) {
      this.isAudioWide = false;
    }else if(isWide == 1) {
      this.isAudioWide = true;
    }

  }

  filterPortfolioItems() {
    if(this.tags.length) {
      this.tags.forEach((tag)=> {
        this.filteredPortfolios = ('image') ? this.portfolios.filter(p=> p.portfolioItemTitle.toLocaleLowerCase().includes(tag.name)) : this.portfolios;
      });
    }else {
      this.filteredPortfolios = this.portfolios;
    }

  }

}
