import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-setup-stepper',
  templateUrl: './setup-stepper.component.html',
  styleUrls: ['./setup-stepper.component.scss']
})
export class SetupStepperComponent implements OnInit {
  public selectTypeForm: FormGroup;
  public profileTypeOptions = ['Director', 'Actor'];

  public personalInfoForm: FormGroup;
  public carrierForm: FormGroup;
  

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildSelectTypeForm();
    this.buildPersonalInfoForm();
    this.buildCarrierForm();
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
  
  buildCarrierForm() {
    this.carrierForm = this.fb.group({
      
    })
  }

  changeProfileCoverPhoto()
  {
    console.log('Change Profile Cover Photo');
  }

}
