import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';
import { CategoriesService } from './../../../../services/categories/categories.service';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { deleteCategory } from 'src/app/models/Interfaces/categories/event/deleteCategory';
import { GetAllProductsResponse } from 'src/app/models/Interfaces/products/response/GetAllProductsResponse';
import { editCategoryAction } from 'src/app/models/Interfaces/categories/event/editCategoryAction';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: []
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  public AllCategories: Array<categoriesResponse> = [];
  private ref!: DynamicDialogRef;


  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private productsService: ProductsService,
    private router: Router
  ){}



  ngOnInit(): void {
    this.getAllCategories();
  }

  telaconfirmarDelete(Evento: deleteCategory){
    this.productsService.GetAllProducts().pipe(takeUntil(this.destroy$)).subscribe({next: (response) => {if (response.filter((m) => m.category.id == Evento.category_id).length > 0) {this.confirmationService.confirm({
      message: `Não é possivel excluir a categoria pois existem ${response.filter((m) => m.category.id == Evento.category_id).length} produtos vinculados a esta categoria`,
      header:  'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptVisible: false,
      rejectVisible: false,
    })  }else{ this.confirmationService.confirm({
          message: `deseja fazer a exclusão da categoria ${Evento.category_name}?`,
          header:  'Confirmação de exclusão',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          accept: () => {this.deletearCategoria(Evento), this.getAllCategories(), this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Sucesso ao excluir a categoria',
            life: 2500
          })}});}}, error: () => {this.getAllCategories(), this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Sucesso ao excluir a categoria',
            life: 2500
          })} })
  }

  deletearCategoria(categoria: deleteCategory): void{
    if (categoria.category_id != '' && categoria.category_name != '') {
      this.categoriesService.deleteCategories(categoria).pipe(takeUntil(this.destroy$)).subscribe({next: () => {this.getAllCategories()}})
    }
  }

  AdicionarCategory(evento: editCategoryAction){
    if (evento) {
      this.ref = this.dialogService.open(CategoryFormComponent,{
        header: evento?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data:{
          event: evento,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({next: () => this.getAllCategories() })
    }
  }

  getAllCategories(){
   this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe({next: (response) => {if(response.length > 0){this.AllCategories = response}}, error: (erro) => {console.log(erro), this.router.navigate(['/dashboard'])}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
