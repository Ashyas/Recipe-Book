import { Subject } from "rxjs";
import { Injectable, OnInit } from "@angular/core";

import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({providedIn: 'root'})
export class RecipeService implements OnInit{
    
    recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];

    constructor(private slServer: ShoppingListService){}

    ngOnInit(): void {
    }
    
    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientToSL(ingredients: Ingredient[]){
        this.slServer.addIngredientS(ingredients);
    }

    getRecipeById(id: number){
        return this.recipes[id];
    }
    
    addNewRecipe(rec: Recipe){
        this.recipes.push(rec);
        this.recipeChanged.next(this.recipes.slice());
    }

    ediExsistingtRecpie(id: number, newRec: Recipe){
        this.recipes[id] = newRec;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes);
    }
}