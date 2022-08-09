import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipeItem: Recipe;
 @Input() index;

  constructor(private recService: RecipeService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    
  }

}
