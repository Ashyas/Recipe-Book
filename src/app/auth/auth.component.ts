import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthResponseData, AuthService } from "../services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit{
    
    isLoginMode = true;
    isLoading = false;
    loginForm: FormGroup;
    error: string = null;

    constructor(
        private authServer: AuthService,
        private router: Router){}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            'userName': new FormControl(null),
            'email': new FormControl(null ,[Validators.required, Validators.email]),
            'password': new FormControl(null ,[Validators.required, Validators.minLength(6)])
        });
    }

    onSubmit(){
        
        let authObserver: Observable<AuthResponseData>;
        const userName = this.loginForm.value.userName;
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.isLoading = true;

        if(this.isLoginMode){
            authObserver = this.authServer.logIn(email, password);
        }else{
            authObserver = this.authServer.signup(userName, email, password);
        }
        authObserver.subscribe(
            resData => {
                this.isLoading = false;
                this.router.navigate(['./recipes']);
            }, 
            errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
            }  
        );
        this.loginForm.reset();
        this.error = null;
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onHandleError(){
        this.error = null;
    }
}