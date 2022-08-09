import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { RecipesComponent } from "./recipes.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule, 
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
    ],
})

export class RecipesModule {}