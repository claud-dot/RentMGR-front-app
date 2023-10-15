import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

constructor(private toastr : ToastrService) { }

public openToastr(message: string, title: string, type: string) {
  if (type == 'warning') {
    this.toastr.warning(message, title, {
      timeOut: 4000
    });
  } else if (type == 'error') {
    this.toastr.error(message, title, {
      timeOut: 4000
    });
  } else if (type == 'info') {
    this.toastr.info(message, title, {
      timeOut: 4000
    });
  } else {
    this.toastr.success(message, title, {
      timeOut: 4000
    });
  }
}

}
