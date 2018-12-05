import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Tag {
  name: string;
}
export interface Union {
  controlName: string;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  spinnerMessage: string = 'Saving Project Data...';

  privacy: boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tag[] = [];
  unions: Union[] = [];

  public projectInfoForm = new FormGroup({
    projectName: new FormControl(""),
    projectLocation: new FormControl(""),
    projectType: new FormControl(""),
    projectGenra: new FormControl(""),
    projectStart: new FormControl(new Date()),
    projectEnd: new FormControl(new Date()),
    // projectEnd: new FormControl(""),
    projectHasUnion: new FormControl(true),
    union1: new FormControl(""),
    union2: new FormControl(""),
    union3: new FormControl(""),
    union4: new FormControl(""),
    union5: new FormControl(""),

  });

  projectUnions: Array<string> = new Array();

  imageFile;
  coverPhotoSelected: boolean = false;
  coverPhotoUploaded: boolean = false;
  task: AngularFireUploadTask;
  coverPhotoUrl;

  constructor(
    public projectService: ProjectService,
    private router: Router,
    private storage: AngularFireStorage,
    public snackBar: MatSnackBar,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.projectUnions.push('adsa');
    this.unions.push({ controlName: 'union1' });
  }

  ngOnInit() {
    console.log(this.projectService.project);

    if (this.projectService.project.projectPrivate) {
      this.privacy = this.projectService.project.projectPrivate;
    }

    if (this.projectService.project.projectTitle) {
      this.projectInfoForm.controls.projectName.setValue(this.projectService.project.projectTitle);
    }

    if (this.projectService.project.projectLocation) {
      this.projectInfoForm.controls.projectLocation.setValue(this.projectService.project.projectLocation);
    }

    if (this.projectService.project.projectType) {
      this.projectInfoForm.controls.projectType.setValue(this.projectService.project.projectType);
    }

    if (this.projectService.project.projectGenres) {
      this.projectInfoForm.controls.projectGenra.setValue(this.projectService.project.projectGenres);
    }

    if (this.projectService.project.projectStart) {
      this.projectInfoForm.controls.projectStart.setValue(this.projectService.project.projectStart);
    }

    if (this.projectService.project.projectEnd) {
      this.projectInfoForm.controls.projectEnd.setValue(this.projectService.project.projectEnd);
    }

    if (this.projectService.project.projectCategories) {
      const categories = this.projectService.project.projectCategories;
      categories.forEach(element => {
        this.tags.push({ name: element });
      });
    }

    if (this.projectService.project.projectUnions) {
      const unions = this.projectService.project.projectUnions;
      unions.forEach(element => {
        this.setUnionValue(element, unions.indexOf(element));
      });
    }

    if (this.projectService.project.projectCover) {
      this.spinnerMessage = 'Loading Saved Data...';
      this.spinner.show();
      this.coverPhotoSelected = true;
      this.coverPhotoUploaded = true;
      console.log(this.projectService.project.projectCover);
      const fileUrl = this.projectService.project.projectCover;
      this.coverPhotoUrl = this.projectService.project.projectCover;
      setTimeout(() => {
        var domElement = document.getElementById('coverImage');
        if (domElement) {
          domElement.setAttribute('src', fileUrl);
          this.spinner.hide();
        }
      }, 1000);
    }

  }

  public changePrivacy() {
    if (this.privacy) {
      this.privacy = false;
    } else {
      this.privacy = true;
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Tag): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public addNewUnion() {
    this.projectUnions.push('New');

    const unionLength = this.projectUnions.length;
    this.unions.push({ controlName: 'union' + unionLength.toString() });
    console.log(this.unions);
  }

  public removeNewUnion() {
    this.projectUnions.pop();
    this.unions.pop();
    console.log(this.unions);
  }

  public setUnionValue(value: string, index: number) {

    if (index == 0) {
      this.projectInfoForm.controls.union1.setValue(value);
    }
    if (index == 1) {
      this.addNewUnion();
      this.projectInfoForm.controls.union2.setValue(value);
    }
    if (index == 2) {
      this.addNewUnion();
      this.projectInfoForm.controls.union3.setValue(value);
    }
    if (index == 3) {
      this.addNewUnion();
      this.projectInfoForm.controls.union4.setValue(value);
    }
    if (index == 4) {
      this.addNewUnion();
      this.projectInfoForm.controls.union5.setValue(value);
    }
  }

  public onUnionSelectionChanged(event: any) {
    console.log(event.value);
  }

  public selectFileToUpload(event) {
    this.coverPhotoSelected = true;
    this.coverPhotoUploaded = false;
    this.imageFile = event.target.files[0];
    var type = this.imageFile.type;
    var videoNode = document.querySelector('image');
    var fileURL = URL.createObjectURL(this.imageFile)

    this.projectService.coverPhotoFile = this.imageFile;

    setTimeout(() => {
      var domElement = document.getElementById('coverImage');
      if (domElement) {
        domElement.setAttribute('src', fileURL);
      }

    }, 1000);

  }



  public startImageUpload() {

    if (!this.coverPhotoUploaded && !this.coverPhotoSelected) {
      this.toastr.error('Please select a cover photo first.', 'Missing Cover!');
    }

    if(this.coverPhotoUploaded && this.coverPhotoSelected) {
      this.nextStep();
    }else if ( !this.coverPhotoUploaded && this.coverPhotoSelected) {
      this.spinner.show();
      const path = `projects/${new Date().getTime()}_${this.imageFile.name}`;
      const customMetadata = { app: 'My AngularFire-powered PWA!' };

      this.task = this.storage.upload(path, this.imageFile, { customMetadata });
      this.task.then(() => {
        const ref = this.storage.ref(path);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          this.coverPhotoUrl = url;
          this.coverPhotoUploaded = true;
          this.nextStep();
        });
      });
    }

  }

  public cancelCoverPhotoSelection() {
    this.coverPhotoSelected = false;
    this.coverPhotoUploaded = false;
  }

  public prevStep() {
    this.router.navigate(["/projects"]);
  }

  public cancelProjectCreate() {
    this.router.navigate(["/projects"]);
  }

  public nextStep() {

    if (this.coverPhotoUrl) {
      this.projectService.project.projectCover = this.coverPhotoUrl;
    }

    this.projectService.project.projectPrivate = this.privacy;
    this.projectService.project.projectTitle = this.projectInfoForm.controls.projectName.value;
    this.projectService.project.projectLocation = this.projectInfoForm.controls.projectLocation.value;
    this.projectService.project.projectType = this.projectInfoForm.controls.projectType.value;
    this.projectService.project.projectGenres = this.projectInfoForm.controls.projectGenra.value;
    this.projectService.project.projectStart = this.projectInfoForm.controls.projectStart.value;
    this.projectService.project.projectEnd = this.projectInfoForm.controls.projectEnd.value;

    const categories: Array<string> = [];
    this.tags.forEach(element => {
      categories.push(element.name);
    });
    this.projectService.project.projectCategories = categories;

    const unions: Array<string> = [];
    this.unions.forEach(element => {
      unions.push(this.projectInfoForm.get(element.controlName).value);
    });
    this.projectService.project.projectUnions = unions;

    this.projectService.project.projectCover = this.coverPhotoUrl;

    this.projectService.createNewProject();

    this.router.navigate(["/projects/new/users"]);
    this.spinner.hide();
  }

  public openErrorMessage(message: string, action: string) {
    this.toastr.error('Please select a cover photo first.', 'Missing Cover!');
  }

}
