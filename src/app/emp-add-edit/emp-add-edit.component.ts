import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent {
  empForm: FormGroup;
  education: string[] = [
    'Matrix',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private showToast:CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });

    
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }


  hasEmptyValues(form: FormGroup): boolean {
    let hasEmpty = false;
    Object.keys(form.controls).forEach((controlName) => {
      const control = form.get(controlName);
      if (control && control.value === '') {
        hasEmpty = true;
        return;
      }
    });
    return hasEmpty;
  }

  handleForm() {
    const emptyValues = this.hasEmptyValues(this.empForm);
    if (!emptyValues) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this.showToast.showToaster('Data updated successfully');
          },
          error: (err) => {
            console.error(err);
          },
        });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this.showToast.showToaster('Data added successfully');
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    } else {
      alert('Please fill all the fields');
    }
  }
  handleCancel() {
    this._dialogRef.close();
  }
}
