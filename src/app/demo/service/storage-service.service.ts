import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {  
  constructor() { }

signOut(): void {
  window.sessionStorage.clear();
}

public saveToken(token: string): void {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
}


public getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
isAuthenticated(): boolean {
  const token = sessionStorage.getItem(TOKEN_KEY);
  console.log(token)
  return !token;
}

public saveUser(user:any): void {
  window.sessionStorage.removeItem(USER_KEY);
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}
public getUser(): any {
  const user = window.sessionStorage.getItem(USER_KEY);
  if (user) {
    return JSON.parse(user);
  }

  return {};
}  

public getAccessToken(): string | null {
  const user = this.getUser();
    return user ? user.accessToken : null;
}
}