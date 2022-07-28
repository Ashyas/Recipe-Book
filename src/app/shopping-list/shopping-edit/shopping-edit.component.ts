import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('myForm', {static: false}) slForm: NgForm;
  editMode = false;
  editModeIndex: number;
  subsciption: Subscription;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService){}

  ngOnInit(): void {
    this.subsciption = this.slService.startedEditing.subscribe(
      (index: number) =>{
        this.editModeIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredentById(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddItem(form: NgForm){
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editModeIndex,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }




  ngOnDestroy(){
    this.subsciption.unsubscribe();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClear();
    if (confirm('Are you sure you want to Delete this item?')) {
      this.slService.onDeleteIngredient(this.editModeIndex);
    } 

  }
}
