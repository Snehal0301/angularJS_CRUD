import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'gender',
    'email',
    'education',
    'dob',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private showToast:CoreService
  ) {}
  ngOnInit(): void {
    this.getEmployee();
  }
  openAddEditForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if(val) this.getEmployee()
      }
    })
  }

  openEditForm(data:any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent,{data});
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if(val) this.getEmployee()
      }
    })
  }

  getEmployee() {
    return this._empService.getEmployee().subscribe({
      next: (val: any) => {
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next: (val: any) => {
        this.showToast.showToaster('Data deleted')
        this.getEmployee();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
