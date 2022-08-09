import { map, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Recipe } from "../models/recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recServer: RecipeService
    ){}

    putStoreRecipes(){ 
        const recipes = this.recServer.getRecipes();
        return this.http.put('https://angular-db-a609b-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchingRecipes(){
        
        return this.http
            .get<Recipe[]>('https://angular-db-a609b-default-rtdb.firebaseio.com/recipes.json')
            .pipe( 
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap(recipes => {
                    this.recServer.setRecipes(recipes);
                })
            );

    }

}