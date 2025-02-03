import { Component, Input } from '@angular/core';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: []
})
export class CategoriesTableComponent {
  @Input() public categories: Array<categoriesResponse> = [];
  public categorySelected!: categoriesResponse;
}
