import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private toastr: ToastrService) {}

  showToaster(message: string){  
    this.toastr.success(message)  
  } 
}
