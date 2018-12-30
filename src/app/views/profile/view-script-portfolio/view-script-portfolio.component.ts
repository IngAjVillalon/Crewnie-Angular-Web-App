import { AuthService } from '../../../core/services/auth/auth.service';
import { ActiveUser, portfolioItem, commentItem } from "src/app/core/models/models";
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';



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

  commentItem$: AngularFirestoreCollection<commentItem>;
  commentItem: commentItem[];

  public commentForm= new FormGroup({
    commentText: new FormControl("")
  });


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
        var elementMobileScriptView = document.getElementById('mobileScriptView');
        if(elmnt) {
          elmnt.setAttribute('data', this.portfolioItem.portfolioFile);
        }

        if(elementMobileScriptView) {
          elementMobileScriptView.setAttribute('href', this.portfolioItem.portfolioFile);
          elementMobileScriptView.innerHTML = "TAP TO VIEW SCRIPT";
        }

      }, 1000)
    });

    this.commentItem$ = this.db
      .collection("users")
      .doc(this.userId)
      .collection("portfolio")
      .doc(this.portfolioId).collection('comments', ref => ref.orderBy('commentDate'));
    this.commentItem$.valueChanges().subscribe(comment => {
      this.commentItem = comment;
      console.log(this.commentItem);
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

  public addComment() {

    const id = this.db.createId();
    const userRef: AngularFirestoreDocument<any> = this.db.doc('users/'+this.currentUser.uid+'/portfolio/'+this.portfolioId+'/comments/'+id);
    const comment = {
      commentId: id,
      commentDate: new Date(),
      commentText: this.commentForm.controls.commentText.value,
      commentUserId: this.currentUser.uid,
      commentUserName: this.currentUser.displayName,
      commentLike: 0
    };


    userRef.set(comment, { merge: true }).then(() => {
      console.log('comment added');
      this.commentForm.get('commentText').setValue('');
    })
    .catch(_error => {
      console.log('Portfolio Not Saved');
    });
  }

  public deleteComment(commentId: string) {
    console.log(commentId, this.portfolioItem.portfolioUserId);
    const userRef: AngularFirestoreDocument<any> = this.db.doc('users/'+this.portfolioItem.portfolioUserId+'/portfolio/'+this.portfolioItem.portfolioId+'/comments/'+commentId);
    userRef.delete();
  }

}
