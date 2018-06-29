import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-stepper',
  templateUrl: './setup-stepper.component.html',
  styleUrls: ['./setup-stepper.component.scss']
})
export class SetupStepperComponent implements OnInit {
  public selectTypeForm: FormGroup;
  public profileTypeOptions = ['Director', 'Actor'];

  public personalInfoForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildSelectTypeForm();
    this.buildPersonalInfoForm();
  }

  buildSelectTypeForm() {
    this.selectTypeForm = this.fb.group({
      profileType: ['', Validators.required]
    })
  }

  buildPersonalInfoForm() {
    this.personalInfoForm = this.fb.group({
      
    })
  }

}
