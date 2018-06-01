import { Component, OnInit } from '@angular/core';
import { SweetAlert2Service } from '../../core/services/sweet-alert2.service';

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.css']
})
export class StyleGuideComponent implements OnInit {

  constructor(
    private alertService: SweetAlert2Service
  ) { }

  ngOnInit() {
    // Swal('Oops...', 'Something went wrong!', 'error');
  }

  sayOk() {
    this.alertService
    .success()
    .subscribe(res => {
      console.log('from success', res)
    })
  }

  confirm() {
    this.alertService
    .confirm()
    .subscribe(confirm => {
      if(confirm.value) {
        this.alertService.success();
      } else {
        this.alertService.error();
      }
    })
  }

}
