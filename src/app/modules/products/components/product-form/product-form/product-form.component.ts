import { ProductsService } from 'src/app/services/products/products.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CategoriesService } from './../../../../../services/categories/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';
import { Router } from '@angular/router';
import { addProductRequest } from 'src/app/models/Interfaces/products/request/addProductRequest';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnDestroy, OnInit {

  constructor(private categoriesService: CategoriesService, private messageService: MessageService, private formBuilder: FormBuilder, private router: Router, private productsService: ProductsService){}

  private readonly destroy$: Subject<void> = new Subject();
  public categoriesData: Array<categoriesResponse> = [];
  public selectedCategory: Array<{name: string, code: string}> = [];
  public addProductionForm = this.formBuilder.group({
    name:['',Validators.required],
    price: ['',Validators.required],
    description: ['',Validators.required],
    category_id: ['',Validators.required],
    amount: [0,Validators.required],
  });

  ngOnInit(): void {
  
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe({next: (response) => {if (response.length > 0) { this.categoriesData = response}}})
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  handleSubmitAddProduct(){
    if (this.addProductionForm?.valid && this.addProductionForm?.value) {
      const requestCreateProduct: addProductRequest = {
        name: this.addProductionForm.value.name as string,
        amount: this.addProductionForm.value.amount as number,
        description: this.addProductionForm.value.description as string,
        price: this.addProductionForm.value.price as string,
        category_id: this.addProductionForm.value.category_id as string
      }

      this.productsService.PostProduct(requestCreateProduct).pipe(takeUntil(this.destroy$)).subscribe({next: (response) => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `Produto ${response.name} incluido com sucesso!`,
        life: 2000
      })});
      this.addProductionForm.reset();
    }
  }
}
