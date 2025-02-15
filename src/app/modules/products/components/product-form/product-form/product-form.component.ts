import { VendasService } from 'src/app/services/vendas/vendas.service';
import { saleProductRequest } from 'src/app/models/Interfaces/products/request/saleProductRequest';
import { EventoProduto } from './../../../../../models/enums/products/ProductEvent';
import { ProductsDataTransferService } from './../../../../../shared/components/products/products-data-transfer.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CategoriesService } from './../../../../../services/categories/categories.service';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';
import { Router } from '@angular/router';
import { addProductRequest } from 'src/app/models/Interfaces/products/request/addProductRequest';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllProductsResponse } from 'src/app/models/Interfaces/products/response/GetAllProductsResponse';
import { EventAction } from 'src/app/models/Interfaces/products/events/eventAction';
import { editProductRequest } from 'src/app/models/Interfaces/products/request/editProductRequest';
import { VendaHomeComponent } from 'src/app/modules/venda-produto/page/venda-home/venda-home.component';
import { registroVenda } from 'src/app/models/Interfaces/products/events/registroVenda';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnDestroy, OnInit {

  constructor(private categoriesService: CategoriesService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private productsService: ProductsService,
    private dialogService: DialogService,
    private productsDataTransferService: ProductsDataTransferService,
    public dialogref: DynamicDialogRef,
    public ref: DynamicDialogConfig,
    public vendasService: VendasService,
  ){}

  private readonly destroy$: Subject<void> = new Subject();
  public categoriesData: Array<categoriesResponse> = [];
  public selectedCategory: Array<{name: string, code: string}> = [];
  public productSelected!: GetAllProductsResponse;
  public productDatas!: Array<GetAllProductsResponse>;
  public saleProductSelected!: GetAllProductsResponse;
  public saleProduct!: GetAllProductsResponse;
  public display: boolean = false;
  public productAction!: {
    event: EventAction,
    productData: Array<GetAllProductsResponse>,
    display: boolean
  }
  public addProductionForm = this.formBuilder.group({
    name:['',Validators.required],
    price: ['',Validators.required],
    description: ['',Validators.required],
    category_id: ['',Validators.required],
    amount: [0,Validators.required],
  });
  public editProductionForm = this.formBuilder.group({
    name:['',Validators.required],
    price: ['',Validators.required],
    description: ['',Validators.required],
    amount: [0,Validators.required],
    category_id: ['',Validators.required]
  });
  public saleProductForm = this.formBuilder.group({
    amount:[0,Validators.required],
    product_id: ['',Validators.required],
  })

  public renderDropdown = false;

  public addProductEvent = EventoProduto.ADD_PRODUCT_EVENT;
  public editProductEvent = EventoProduto.EDIT_PRODUCT_EVENT;
  public saleProductEvent = EventoProduto.VEND_PRODUCT_EVENT;

  ngOnInit(): void {
    this.productAction = this.ref.data;
    this.display = this.productAction.display;


    if (this.productAction.event.action === this.saleProductEvent) {
      this.getProductDatas();
    }
    this.getAllCategories();
    this.renderDropdown = true;
  }
  getAllCategories(): void {
    this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe({next: (response) => {if (response.length > 0) {
    this.categoriesData = response;
    if (this.productAction.event?.action === this.editProductEvent && this.productAction.productData) {
      this.getSelectedProduct(this.productAction.event.id as string)
    }
  }}})
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleSubmitEditProduct(): void {
    if (this.editProductionForm.valid && this.editProductionForm.value  && this.productAction.event.id) {
      const requestEditProduct: editProductRequest={
        name: this.editProductionForm.value.name as string,
        amount: this.editProductionForm.value.amount as number,
        description: this.editProductionForm.value.description as string,
        price: this.editProductionForm.value.price as string,
        product_id: this.productAction?.event.id as string,
        category_id: this.editProductionForm.value.category_id as string
      }
      this.productsService.PutProduct(requestEditProduct).pipe(takeUntil(this.destroy$)).subscribe({next: () => {this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Produto editado com sucesso', life: 2500}); this.editProductionForm.reset()}, error: (erro) => {this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possivel editar o produto', life: 2000}), console.log(erro), this.editProductionForm.reset()}})
    }
  }

  getProductDatas(): void{
    this.productsService.GetAllProducts().pipe(takeUntil(this.destroy$))
    .subscribe({next: (response) => {if (response.length > 0){this.productDatas = response; if (response.length > 0) {this.productDatas = response; this.productsDataTransferService.setProductsDatas(this.productDatas)}}}})
  }

  getSelectedProduct(product_id: string): void{
    const allProducts = this.productAction.productData;

    if (allProducts.length > 0) {
      const productFiltred = allProducts.filter((m) => m?.id == product_id);
      if (productFiltred) {
        this.productSelected = productFiltred[0];

        this.editProductionForm.setValue({
          name: this.productSelected?.name,
          price: this.productSelected?.price,
          description: this.productSelected?.description,
          amount: this.productSelected?.amount,
          category_id: this.productSelected?.category?.id
        });
      }
    }
  }
  handleSubmitAddProduct(){
    if (this.addProductionForm.valid && this.addProductionForm.value) {
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
      }), error: (erro) => console.log(erro)});
      this.addProductionForm.reset();
    }
  }
  handleSubmitSaleProduct(){
    if (this.saleProductForm.valid && this.saleProductForm.value) {
      var valorTotal!: number;
      const requestDatas: saleProductRequest = {
        amount: this.saleProductForm.value.amount as number,
        product_id: this.saleProductForm.value.product_id as string
      }
      console.log(requestDatas)
      if (requestDatas) {
        this.productDatas.find((response) => {if (response.id === requestDatas.product_id) { this.saleProduct = response}})
      }
      valorTotal = parseFloat(this.saleProduct.price) * requestDatas.amount;
      const registroVenda : registroVenda = {
        id: requestDatas.product_id + '01',
        name: this.saleProduct.name as string,
        amount: requestDatas.amount,
        valorTotal: valorTotal.toString()
      }

      this.vendasService.atualizarLista(registroVenda);

this.productsService.PutSaleProduct(requestDatas).pipe(takeUntil(this.destroy$)).subscribe({next: (response) => {if (response){ this.dialogref.close(), this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `A venda foi efetuada com sucesso`,
        life: 2500
      }), this.router.navigate(['/dashboard']), this.getProductDatas()}}, error: (erro) => {this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possivel realizar a venda',
        life: 2500
      }), console.log(erro)}})

    }
  }
}
