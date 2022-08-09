import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeToShow: Recipe;
  id: number;

  constructor(private recipeServer: RecipeService,
              private route: ActivatedRoute,
              private router: Router ) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeToShow = this.recipeServer.getRecipeById(this.id);
      });
  }

  addToShop(){
    this.recipeServer.addIngredientToSL(this.recipeToShow.ingredients);
  }

  editRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteCurrRecipe(){
    this.recipeServer.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
