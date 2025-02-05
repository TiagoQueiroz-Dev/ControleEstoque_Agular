import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from './../../../../services/categories/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { editCategoryAction } from 'src/app/models/Interfaces/categories/event/editCategoryAction';
import { CategoryEvent } from 'src/app/models/enums/categories/CategoryEvent';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: []
})
export class CategoryFormComponent implements OnInit, OnDestroy{

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public ref: DynamicDialogConfig,
  ){}

  public category!: {event: editCategoryAction};
  public selectedCategory!: categoriesResponse;
  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

  ngOnInit(): void {
    console.log(this.ref.data);
    this.category = this.ref.data;

    if (this.category.event.action === this.editCategoryAction && this.category.event.id) {
      this.editarCategoria(this.category.event.name as string);
    }

  }


  private readonly destroy$: Subject<void> = new Subject();
  public addCategorieForm = this.formBuilder.group({
    name:['', Validators.required]
  });


  handleSubmitAddCategories(){
    if(this.addCategorieForm.valid && this.addCategorieForm.value) {
      const Novacategoria: {name: string} = {
        name: this.addCategorieForm.value.name as string
      }
      this.categoriesService.postNewCategory(Novacategoria).pipe(takeUntil(this.destroy$)).subscribe({next: () => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `A categoria foi incluida com sucesso`,
        life: 2500
      }), error: (erro) => {this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Categoria não foi incluida',
        life: 2500
      }), console.log(erro)}})
    }
  }

  separa(){
    if (this.category.event.action === this.editCategoryAction && this.category.event.id) {
      this.handleSumiteditcategories();
    }else{
      this.handleSubmitAddCategories();
    }
  }

  handleSumiteditcategories(){
    if(this.addCategorieForm.valid && this.addCategorieForm.value){
      const categoriaAtualizada: {name: string, category_id: string} = {
        name: this.addCategorieForm.value.name as string,
        category_id: this.category.event.id as string
      }
      this.categoriesService.putCategory(categoriaAtualizada).pipe(takeUntil(this.destroy$)).subscribe({next: () => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `A categoria foi atualizada com sucesso`,
        life: 2500
      }), error: (erro) => {this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possivel atualizar a categoria',
        life: 2500
      }), console.log(erro)}})
    }
  }

  editarCategoria(categoryName: string){
    this.addCategorieForm.setValue({name: categoryName});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
