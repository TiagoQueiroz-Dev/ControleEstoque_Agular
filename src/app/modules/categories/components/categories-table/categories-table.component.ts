import { Component, EventEmitter, Input, Output } from '@angular/core';
import { deleteCategory } from 'src/app/models/Interfaces/categories/event/deleteCategory';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: []
})
export class CategoriesTableComponent {
  @Input() public categories: Array<categoriesResponse> = [];
  @Output() public deleteCategories = new EventEmitter<deleteCategory>();
  public categorySelected!: categoriesResponse;


  handleCategoryEvent(category_id: string, category_name: string): void{
    this.deleteCategories.emit({category_id,category_name}), console.log('componente filho',{category_id,category_name});
  }
}
