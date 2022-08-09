import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../models/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService{
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [];
    
    getIngredients(){
      return this.ingredients.slice();
    }

    getIngredentById(index: number){
      return this.ingredients[index];
    }

    addIngredient(value: Ingredient){
        this.ingredients.push(value);
        this.ingredientChanged.next(this.ingredients.slice());
      }
    
      addIngredientS(ings: Ingredient[]){
        this.ingredients.push(...ings);
        this.ingredientChanged.next(this.ingredients.slice());
      }
    
    updateIngredient(index: number, newIng: Ingredient){
      this.ingredients[index] = newIng;
      this.ingredientChanged.next(this.ingredients.slice());
    }

    onDeleteIngredient(index: number){
      this.ingredients.splice(index, 1);
      this.ingredientChanged.next(this.ingredients.slice());
    }
}