import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';// Adjust the path as needed

const baseUrlCreate = environment.API_BASE_URL+'/auth/signup';
const baseUrl = environment.API_BASE_URL+'/users';
const baseUrlAddSec = environment.API_BASE_URL+'/users/addsec';
const baseUrlAddDoct = environment.API_BASE_URL+'/users/adddoct';
const baseUrlCheckIn = environment.API_BASE_URL+'/checkincheckout/checkin'
const baseUrlCheckOut = environment.API_BASE_URL+'/checkincheckout/checkout'
const baseUrlgetReport=environment.API_BASE_URL+'/checkincheckout/getReport'
const baseUrlgetCountOfInterns=environment.API_BASE_URL+'/employees/countInterns';
const baseUrlgetCountOfEmployees=environment.API_BASE_URL+'/employees/countEmployees';
const baseUrlgetTotalDurationByEmployeeIdAndDateRange=environment.API_BASE_URL+'/checkincheckout/totalDuration'
const baseUrlgetTotalHoursByEmployeeAndDate=environment.API_BASE_URL+'/checkincheckout/totalHoursByEmployeeAndDate'
const baseUrlgetTotalHoursByDateRange=environment.API_BASE_URL+'/checkincheckout/totalHoursByDateRange'
const baseUrlCheck=environment.API_BASE_URL+'/checkincheckout'
const baseUrlGetEmployeeStatusCounts=environment.API_BASE_URL+'/employees/employeeStatus';
const baseUrlsearchEmployeesByName=environment.API_BASE_URL+'/employees/searchEmp'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    let url2 = `${baseUrl}`;
   
    return this.http.get<any[]>(baseUrl, { responseType: 'json' });
  }
  
  getDoctorByServiceName(departmentId:Number,role:String):Observable<any[]>{
    let url = `${baseUrl}/uu?departmentId=${departmentId}&role=${role}`;

    return this.http.get<any[]>(url, { responseType: 'json' });
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createsec(data: any): Observable<any> {
    return this.http.post(baseUrlAddSec, data);
  }
  createdoct(data: any): Observable<any> {
    return this.http.post(baseUrlAddDoct, data);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`,{responseType: 'text'});
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  getEmployeeById(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`,{responseType: 'text'});
  }

  checkInTime(data: any): Observable<any> {
    return this.http.post(baseUrlCheckIn, data,{responseType: 'text'});
  }

  check(data:any): Observable<any> {
    return this.http.post(baseUrlCheck, data,{responseType: 'text'});
  }


  checkOutTime(data: any): Observable<any> {
    return this.http.post(baseUrlCheckOut, data,{responseType: 'text'});
  }

  getReport(employeeId:any,startDate:any,endDate:any): Observable<any> {
   let url = `${baseUrlgetReport}?employeeId=${employeeId}&startDate=${startDate}`;

  // Check if endDate is provided before appending it to the URL
  if (endDate) {
    url += `&endDate=${endDate}`;
  }

  return this.http.get(url);
    //return this.http.get(`${baseUrlgetReport}?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`);
  }



  getTotalDurationByEmployeeIdAndDate(employeeId:number,startDate:any,endDate:any): Observable<any> {
    let url = `${baseUrlgetTotalDurationByEmployeeIdAndDateRange}/${employeeId}?startDate=${startDate}`;

    // Check if endDate is provided before appending it to the URL
    if (endDate) {
      url += `&endDate=${endDate}`;
    }
  
    return this.http.get(url);
   
  }

  getTotalHoursByEmployeeAndDate(date: any,page:number,size:number): Observable<any> {
    return this.http.get(`${baseUrlgetTotalHoursByEmployeeAndDate}/${date}?page=${page}&size=${size}`);
  }

  getTotalHoursByDateRange(startDate:any,endDate:any,page:number,size:number): Observable<any> {
    return this.http.get(`${baseUrlgetTotalHoursByDateRange}?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`);
  }
  findIsInternById(employeeId: number): Observable<any> {
    const url = environment.API_BASE_URL+`/employees/findIsInternById/${employeeId}`;
    return this.http.get<boolean>(url);
  }
  
  getFilteredEmployees(isIntern: any[], departments: any[], page: number, size: number): Observable<any> {
    // Construct the base URL
    let url = environment.API_BASE_URL+`/employees/filter?page=${page}&size=${size}`;
  
    // Check if isIntern is not empty and append it to the URL
    if (isIntern && isIntern.length > 0) {
      url += `&isIntern=${isIntern.join(',')}`;
    }
  
    // Check if departments is not empty and append it to the URL
    if (departments && departments.length > 0) {
      url += `&departments=${departments.join(',')}`;
    }
  
    return this.http.get<any>(url);
  }
  getEmployeeStatusCounts(employeeStatus:any,isIntern:number){
    return this.http.post(`${baseUrlGetEmployeeStatusCounts}?isIntern=${isIntern}`,employeeStatus);
  }

  getCountOfInterns(): Observable<any> {
    return this.http.get(`${baseUrlgetCountOfInterns}`);
  }
  getCountOfEmployees(): Observable<any> {
    return this.http.get(`${baseUrlgetCountOfEmployees}`);
  }


  searchEmployeesByName(name: string): Observable<any> {
    return this.http.get(`${baseUrlsearchEmployeesByName}?name=${name}`);
  }



  getStatusByPositionInCompany(date:any,isIntern: any[]): Observable<any> {
    // Construct the base URL
    let urls = environment.API_BASE_URL+`/employees/statusByPosition?date=${date}&isIntern=${isIntern}`;
  
   
  
  
    return this.http.get<any>(urls);
  }


}

