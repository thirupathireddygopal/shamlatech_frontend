import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { env } from '../config/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // checking weather the user is logged in
  isLoggedIn() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  // Store Token,User on local storage......
  storeUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // logging out user
  logoutUser() {
    localStorage.clear();
  }

  register(user) {
    let header_ = new HttpHeaders();
    header_.append('Content-Type', 'application/json');
    return this.httpClient.post(env.baseUrl + '/user/register', user, { headers: header_ })
  }

  login(user) {
    let header_ = new HttpHeaders();
    header_.append('Content-Type', 'application/json');
    return this.httpClient.post(env.baseUrl + '/user/login', user, { headers: header_ })
  }

  saveUsers(user) {
    let header_ = new HttpHeaders();
    header_.append('Content-Type', 'application/json');
    return this.httpClient.post(env.baseUrl + '/user/saveUsers', user, { headers: header_ })
  }

  createUser(user) {
    let header_ = new HttpHeaders();
    header_.append('Content-Type', 'application/json');
    return this.httpClient.post(env.baseUrl + '/user/createUser', user, { headers: header_ })
  }

  getUsers() {
    let header_ = new HttpHeaders();
    header_.append('Content-Type', 'application/json');
    return this.httpClient.get(env.baseUrl + '/user/getUsers', { headers: header_ })
  }

  getUserInfo(userId) {
    let obj = { userId: userId }
    let header_ = new HttpHeaders();
    header_.append('Content-Type', 'application/json');
    return this.httpClient.post(env.baseUrl + '/user/getUserInfo', obj, { headers: header_ })
  }

  updateUserInfo(user, userId) {
    console.log(`user info: ${JSON.stringify(user)}`);
    let obj = user;
    let obj2 = { userId: userId };
    Object.assign(obj, obj2);
    let header_ = new HttpHeaders();
    header_.append('Content-Type', 'application/json');
    return this.httpClient.post(env.baseUrl + '/user/updateUser', obj, { headers: header_ })
  }

  deleteUser(userId) {
    let header_ = new HttpHeaders();
    header_.append('Content-Type', 'application/json');
    return this.httpClient.post(env.baseUrl + '/user/deleteUser', userId, { headers: header_ })
  }
}
