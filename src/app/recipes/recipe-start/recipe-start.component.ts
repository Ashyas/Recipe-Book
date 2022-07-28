import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  isRecEmpty: boolean = true;
  constructor(private recService: RecipeService){}

  ngOnInit(): void {
    if(this.recService.getRecipes().length > 0){
      this.isRecEmpty = false;
    }
  }
}
