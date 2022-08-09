import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {catchError, tap } from "rxjs/operators"
import { BehaviorSubject, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { User } from "../models/user.model";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    username?: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    isLogged: boolean = false;
    private tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ){}

    signup(userName: string, email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError), 
                tap(resData => {
                    resData.username = userName;
                    console.log('userName: ' +userName);
                    console.log('ResData.userName: ' +resData.username);
                    //console.log('this.user.valu.userName: ' +this.user.value.userName);
                    this.handleAuthentication(resData);
                }
            )
        );
    }

    logIn(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError), 
                tap(resData => {
                    //resData.username = this.user.value.userName;
                    this.handleAuthentication(resData);
                }
            )
        );
    }

    autoLogin() {
        this.isLogged = true;
        const userData: {
            userName: string,
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
       
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.userName, userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.isLogged = false;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(resData: AuthResponseData){
        const expirationDate = new Date( new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.username, resData.email,resData.localId,resData.idToken,expirationDate);
        this.user.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        this.isLogged = true;
    }

    private handleError(errorRes : HttpErrorResponse){
        let errorMessage: string;
        switch (errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED' :
                errorMessage = 'Password sign-in is disabled for this project';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER' :
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD' :
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED' :
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
            default:
                errorMessage = 'An unknown error occurred!';
                break;
        }
        return throwError(errorMessage);
    }

    getUserName(){
        if (this.user.value.userName){
            return this.user.value.userName;
        }
    }

    getIsLoggedIn(){
        return this.isLogged;
    }
}