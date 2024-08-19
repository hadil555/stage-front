import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';


import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { StorageService } from '../demo/service/storage-service.service';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService:StorageService){}
  intercept(
  request: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> {
  // Get the token from session storage
  const token2 = this.storageService.getToken();
  const accessToken = this.storageService.getAccessToken();
  const token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFpbWEgc29tcmFuaSIsImlhdCI6MTcwNDEwNjQ1MiwiZXhwIjoxNzA0MTkyODUyfQ.ewOXQlje5ZL-Ha50oPcBUFpu6SVzLBbP5-7Wb45Slmg";  // Clone the request and add the token to the headers
  const authRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Pass the cloned request with the token to the next handler
  return next.handle(authRequest);
}}