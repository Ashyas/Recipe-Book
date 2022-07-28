import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import { DataStorageService } from "../services/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    
    isAuthenticated: boolean = false;
    private userSub: Subscription;
        
    constructor(
        private dataService: DataStorageService,
        private authService: AuthService
    ){}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(
            user => {
                this.isAuthenticated = !!user;
            }
        );

    }
    
    onSaveData(){
        this.dataService.putStoreRecipes();
    }

    onFetchData(){
        this.dataService.fetchingRecipes().subscribe();
    }

    onLogout(){
        this.isAuthenticated = !this.isAuthenticated;
        this.authService.logout();
    }


    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}