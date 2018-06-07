import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-stepper',
  templateUrl: './setup-stepper.component.html',
  styleUrls: ['./setup-stepper.component.scss']
})
export class SetupStepperComponent implements OnInit {
  public selectTypeForm: FormGroup;
  public profileTypeOptions = ['Director', 'Actor']
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildSelectTypeForm();
  }

  buildSelectTypeForm() {
    this.selectTypeForm = this.fb.group({
      profileType: ['', Validators.required]
    })
  }

}
