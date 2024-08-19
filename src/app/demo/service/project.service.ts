import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';


const baseUrl = 'http://localhost:8081/api/projects';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  getAll(page:number,size:number): Observable<any[]> {
    let url2 = `${baseUrl}?page=${page}&size=${size}`;

    return this.http.get<any[]>(url2);
  }



  

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
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
}
