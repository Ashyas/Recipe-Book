import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  isIngredientListEmpty: boolean = false;

  constructor(private route: ActivatedRoute, 
              private recService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
    this.initForm();
  }

  
  private initForm(){
    let recipeIngredient = new FormArray([]);
    const recipe = this.recService.getRecipeById(this.id);
    let recName = '';
    let image = '';
    let descrip = '';

    if(this.editMode){
      recName = recipe.name;
      image = recipe.imagePath;
      descrip = recipe.description;
    
      if(recipe['ingredients']){
        for (let ing of recipe.ingredients){
          recipeIngredient.push(
            new FormGroup({
              'name': new FormControl(ing.name,Validators.required),
              'amount': new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
             })
          );
        }
      }
    }else{ this.isIngredientListEmpty = true;}

    this.recipeForm = new FormGroup({
      'name': new FormControl(recName, Validators.required),
      'imagePath': new FormControl(image, Validators.required),
      'description': new FormControl(descrip, Validators.required),
      'ingredients': recipeIngredient
    });
  }
  


  onSubmit(){
    if(this.editMode){
      this.recService.ediExsistingtRecpie(this.id, this.recipeForm.value);
      this.editMode = false;
    } else{
      this.recService.addNewRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  get ingControls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
    this.isIngredientListEmpty = false;
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }



  onIngredientDelete(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    if((<FormArray>this.recipeForm.get('ingredients')).length < 1){
      this.isIngredientListEmpty = true;
    }
  }

  onClearAllIngs(){
    (<FormArray>this.recipeForm.get('ingredients')).clear();
    this.isIngredientListEmpty = true;
  }
}
