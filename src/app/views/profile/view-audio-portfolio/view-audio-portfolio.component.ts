import { AuthService } from "./../../../core/services/auth.service";
import { ActiveUser, portfolioItem, commentItem } from "src/app/core/models/models";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { AngularFireStorage } from "@angular/fire/storage";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { DomSanitizer } from "@angular/platform-browser";
import { element } from "protractor";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-view-audio-portfolio",
  templateUrl: "./view-audio-portfolio.component.html",
  styleUrls: ["./view-audio-portfolio.component.scss"]
})
export class ViewAudioPortfolioComponent implements OnInit {
  userId;
  currentUser$: AngularFirestoreDocument<ActiveUser>;
  public currentUser: ActiveUser;
  portfolioUser$: AngularFirestoreDocument<ActiveUser>;
  public portfolioUser: ActiveUser;

  portfolioId;
  portfolioItem$: AngularFirestoreDocument<portfolioItem>;
  portfolioItem: portfolioItem;

  commentItem$: AngularFirestoreCollection<commentItem>;
  commentItem: commentItem[];

  public commentForm= new FormGroup({
    commentText: new FormControl("")
  });

  portfolioThumbImageUrl: string =
    "https://firebasestorage.googleapis.com/v0/b/crewnie-test.appspot.com/o/assets%2Fimage-placeholder.png?alt=media&token=55096cfb-5a07-41b7-90a4-20630b7c021a";

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
    // Catch Url Parameter
    this.portfolioId = this.route.snapshot.queryParams["id"];
    this.userId = this.route.snapshot.queryParams["userId"];

    // Get The Current User
    this.currentUser$ = this.db.doc<ActiveUser>("users/" + this.userId);
    this.currentUser$.valueChanges().subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser.displayName);
    });

    // Get The Portfolio Item
    this.portfolioItem$ = this.db
      .collection("users")
      .doc(this.userId)
      .collection("portfolio")
      .doc(this.portfolioId);
    this.portfolioItem$.valueChanges().subscribe(portfolio => {
      this.portfolioItem = portfolio;
      this.portfolioThumbImageUrl = this.portfolioItem.portfolioThumb;
      setTimeout(() => {
        var elmnt = document.getElementById("myAudio");
        if(elmnt) {
          elmnt.setAttribute("src", this.portfolioItem.portfolioFile);
        }
      }, 1000);

      // Get Portfolio Creator
      this.portfolioUser$ = this.db.doc<ActiveUser>("users/" + this.portfolioItem.portfolioUserId);
      this.portfolioUser$.valueChanges().subscribe(user => {
        this.portfolioUser = user;
        console.log(this.portfolioUser);
      });
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

  ngOnInit() {}

  shouldEdit() {
    // console.log(this.currentUser.uid);
    // console.log(this.portfolioUser.uid);
    if(this.currentUser.uid === this.portfolioUser.uid) {
      return true;
    }else {
      return false;
    }
  }

  goBack() {
    this._location.back();
  }

  editPortfolioItem() {

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
