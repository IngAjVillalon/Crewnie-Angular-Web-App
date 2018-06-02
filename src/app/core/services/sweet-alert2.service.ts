import { Injectable } from '@angular/core';
import swal, { SweetAlertArrayOptions, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SweetAlert2Service {
  
  constructor() {}

  public alert(options: SweetAlertOptions = {}): Observable<SweetAlertResult> {
    let defaultOptions = {
      buttonsStyling: false,
      cancelButtonText: false,
      confirmButtonClass: 'mat-raised-button t-info t-color-white swal-button',
      cancelButtonClass: 'mat-raised-button mat-warn swal-button'
    }
    options = <SweetAlertOptions>{ ...defaultOptions, ...options };
    // console.log(options)
    return from(swal(options));
  }
  
  public success(options: SweetAlertOptions = {}): Observable<SweetAlertResult> {
    return this.alert({
      title: options.title || 'Success!',
      text: options.text || '',
      type: 'success',
      confirmButtonText: options.confirmButtonText || 'Ok'
    });
  }

  public confirm(options: SweetAlertOptions = {}): Observable<SweetAlertResult> {
    return this.alert({
      title: options.title || 'Confirm',
      text:  options.text || 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText:  options.confirmButtonText || 'Yes',
      cancelButtonText:  options.cancelButtonText || 'No'
    })
  }

  public error(options: SweetAlertOptions = {}): Observable<SweetAlertResult> {
    return this.alert({
      title: options.title || 'Error!',
      text: options.text || 'Something went wrong.',
      type: 'error',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: options.cancelButtonText || 'Cancel'
    })
  }

}
