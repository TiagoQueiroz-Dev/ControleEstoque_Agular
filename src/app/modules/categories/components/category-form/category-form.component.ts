import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from './../../../../services/categories/categories.service';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: []
})
export class CategoryFormComponent implements OnDestroy{

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ){}


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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
