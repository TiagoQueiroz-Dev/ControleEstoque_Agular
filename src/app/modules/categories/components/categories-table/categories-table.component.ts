import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryEvent } from 'src/app/models/enums/categories/CategoryEvent';
import { deleteCategory } from 'src/app/models/Interfaces/categories/event/deleteCategory';
import { editCategoryAction } from 'src/app/models/Interfaces/categories/event/editCategoryAction';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: []
})
export class CategoriesTableComponent {
  @Input() public categories: Array<categoriesResponse> = [];
  @Output() public deleteCategories = new EventEmitter<deleteCategory>();
  @Output() public addEvent = new EventEmitter<editCategoryAction>();
  public categorySelected!: categoriesResponse;
  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;


  handleDeleteCategoryEvent(category_id: string, category_name: string): void{
    this.deleteCategories.emit({category_id,category_name}), console.log('componente filho',{category_id,category_name});
  }

  handleCategoryEvent(action: string, id?: string, name?: string): void{
    if (action && action != '') {
      this.addEvent.emit({action, id, name})

    }
  }
}
