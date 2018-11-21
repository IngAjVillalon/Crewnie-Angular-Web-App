import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { projectItem } from '../models/models';

export interface Depertments {

}

export interface Project {
  createdAt?: firebase.firestore.Timestamp;
  modifiedAt?: firebase.firestore.Timestamp;

  projectId?: string;
  creatorId?: string;

  prijectTitle?: string;
  projectCover?: string;
  projectLocation?: string;
  projectType?: string;

  projectGenres?: Array<string>;
  projectCategories?: Array<string>;
  projectUnions?: Array<string>;

  projectStart?: firebase.firestore.Timestamp;
  projectEnd?: firebase.firestore.Timestamp;

  projectPrivate?: boolean;

  projectDepertments?: Array<Depertments>

}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public hero: string;
  public project: Project = {};

  projects$: AngularFirestoreCollection<projectItem>;
  projects: projectItem[];

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) {

  }

  public getProject(userId:string) {
    return this.db.collection('projects', ref => ref.where('creatorId', '==', userId));
  }
}
