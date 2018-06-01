import { Injectable } from '@angular/core';
import swal, { SweetAlertArrayOptions, SweetAlertOptions } from 'sweetalert2';
import { Observable, from, of } from 'rxjs';
// const swalWithMatButtons = swal.mixin({
//   confirmButtonClass: 'btn btn-success',
//   cancelButtonClass: 'btn btn-danger',
//   buttonsStyling: false,
// })

// class AlertOptions implements SweetAlertOptions {
//   public confirmButtonText;
//   public cancelButtonText;
//   public confirmButtonClass;
//   public cancelButtonClass;

//   constructor(params: SweetAlertOptions = {}) {
//     this.confirmButtonText = params.confirmButtonText;
//     this.cancelButtonText = params.cancelButtonText;
//     this.cancelButtonClass = params.cancelButtonClass;
//     this.confirmButtonClass = params.confirmButtonClass;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class SweetAlert2Service {
  swalRef;
  constructor() {

  }
  swAlart(options): Observable<any> {
    let defaultOptions = {
      buttonsStyling: false,
      cancelButtonText: false,
      confirmButtonClass: 'mat-raised-button blue color-white swal-button',
      cancelButtonClass: 'mat-raised-button mat-warn swal-button'
    }
    options = { ...defaultOptions, ...options };
    console.log(options)
    return from(swal(options));
  }
  open() {
    return swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  public success({ title, text, confirmButtonText } = <any>{}): Observable<any> {
    return this.swAlart({
      title: title || 'Success!',
      text: text || '',
      type: 'success',
      confirmButtonText: confirmButtonText || 'Ok'
    })

    // this.swalRef = this.open();
    // console.log(this.swalRef)
  }

  public confirm({ title, text, confirmButtonText, cancelButtonText } = <any>{}) {
    return this.swAlart({
      title: title || 'Confirm',
      text: text || 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText || 'Yes',
      cancelButtonText: cancelButtonText || 'No'
    })
  }

  public error({ title, text, cancelButtonText } = <any>{}) {
    return this.swAlart({
      title: title || 'Error!',
      text: text || 'Something wrong happened.',
      type: 'error',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: cancelButtonText || 'Cancel'
    })
  }
}
