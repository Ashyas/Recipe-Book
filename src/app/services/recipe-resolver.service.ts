import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../models/recipe.model";
import { DataStorageService } from "./data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable()
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