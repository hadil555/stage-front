import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
const baseUrlReset=environment.API_BASE_URL+'/auth/user/resetPassword'
const AUTH_API = environment.API_BASE_URL+'/auth/';
const AUTH_API2 = environment.API_BASE_URL+'/users/emp';
const AUTH_APII = environment.API_BASE_URL+'/auth';
const baseValidateToken=environment.API_BASE_URL+'/auth/user/validateToken'
const baseUrlSavePassword=environment.API_BASE_URL+'/auth/user/savePassword'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials:any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
  
  register(user:any): Observable<any> {
    return this.http.post(AUTH_API2 , {
      username: user.username,
      email: user.email,
      password: user.password,
      departement:user.departement,
      phone: user.phone,
    
      birthdate: user.birthdate,
      
      
     
      
    }, httpOptions);
  }

  /* register(user:any): Observable<any> {
    return this.http.post(AUTH_API2 + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      departement:user.departement,
      birthdate: user.birthdate,
      
      
     
      
    }, httpOptions);
  }
*/
  resetPassword(userEmail:any) :Observable<any>{
    return this.http.post(`${baseUrlReset}`,userEmail,{ responseType: 'text' as 'json' });
  }

  validateCode(token:any,email:any):Observable<any>{
    return this.http.get(`${baseValidateToken}?token=${token}&email=${email}`,{ responseType: 'text' as 'json' });
 
  
  }
  changePwd(request: any): Observable<any> {
    const url = `${AUTH_APII}/changePassword`;

    // Assuming you have a proper API endpoint for changing passwords
    return this.http.put(url, request,{ responseType: 'text' as 'json' });
  }

  savePassword(passwordDto:any,email:any):Observable<any>{
    return this.http.post(`${baseUrlSavePassword}`,passwordDto,{ responseType: 'text' as 'json' });
  }

}