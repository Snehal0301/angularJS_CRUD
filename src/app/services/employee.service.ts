import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}
  addEmployee(data: any) {
    return this._http.post('http://localhost:3000/employee',data);
  }

  getEmployee() {
    return this._http.get('http://localhost:3000/employee');
  }

  updateEmployee(id: any, data: any) {
    return this._http.put('http://localhost:3000/employee/' + id, data);
  }
  
  deleteEmployee(id: any) {
    return this._http.delete('http://localhost:3000/employee/' + id);
  }
}
