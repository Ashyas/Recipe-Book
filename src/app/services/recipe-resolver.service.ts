import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Recipe } from "../models/recipe.model";
import { RecipeService } from "./recipe.service";
import { DataStorageService } from "./data-storage.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataServce: DataStorageService, private recService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recService.getRecipes();
        if(recipes.length === 0){
            return this.dataServce.fetchingRecipes();
        } else {
            return recipes;
        }
    }

}