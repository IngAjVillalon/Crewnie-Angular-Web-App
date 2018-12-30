import { ActiveUser, portfolioItem, commentItem } from "src/app/core/models/models";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { Location, DatePipe } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { FormGroup, FormControl } from "@angular/forms";

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

  public addComment() {

    const id = this.db.createId();
    const userRef: AngularFirestoreDocument<any> = this.db.doc('users/'+this.currentUser.uid+'/portfolio/'+this.portfolioId+'/comments/'+id);
    const comment = {
      commentId: id,
      commentDate: new Date(),
      commentText: this.commentForm.controls.commentText.value,
      commentUserId: this.currentUser.uid,
      commentUserName: this.currentUser.nickName,
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
