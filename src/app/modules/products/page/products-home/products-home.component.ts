import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { deleteActionProduct } from './../../../../models/Interfaces/products/events/deleteActionProduct';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProductsDataTransferService } from './../../../../shared/components/products/products-data-transfer.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GetAllProductsResponse } from 'src/app/models/Interfaces/products/response/GetAllProductsResponse';
import { EventoProduto } from 'src/app/models/enums/products/ProductEvent';
import { EventAction } from 'src/app/models/Interfaces/products/events/eventAction';
import { ProductFormComponent } from '../../components/product-form/product-form/product-form.component';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  public datas: Array<GetAllProductsResponse> = [];
  private ref!: DynamicDialogRef;



  constructor (private productsService: ProductsService, private productsDataTransferService: ProductsDataTransferService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService,private dialogService: DialogService){}

  handleProductAction(evento: EventAction): void{
    if (evento) {
        this.ref = this.dialogService.open(ProductFormComponent,{
        header: evento?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data:{
          event: evento,
          productData: this.datas
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({next: () => this.GetAPIProductsDatas(),})
    }
  }

  handleDeleteAction(evento: deleteActionProduct): void{
    if (evento) {
      console.log('deu tudo certo', evento);
      this.confirmationService.confirm({
        message: `Deseja realmente excluir o produto ${evento.name}?`,
        header:  'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(evento?.id)
      });
    }
  }
  deleteProduct(id: string) {
    if (id) {
      this.productsService.DeleteProduct(id).pipe(takeUntil(this.destroy$)).subscribe({next: (retorno) => {if (retorno){this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Produto excluido com sucesso', life: 2500}), this.GetAPIProductsDatas()}}, error: (erro) => {if (erro){this.messageService.add({severity: 'error', summary: 'Falha', detail: 'Falha ao excluir o produto, entre em contato com o suporte', life: 2500})}}})
    }
  }

  ngOnInit(): void {
    this.getServiceProductDatas()
  }
  getServiceProductDatas() {

    const productsLoaded = this.productsDataTransferService.getProductsDatas();

    if (productsLoaded.length > 0) {
      this.datas = productsLoaded;
      console.log('Produtos vindos do BehaviorSubject no product-data-transfer', this.datas);
    }else{
      this.GetAPIProductsDatas();
    }
  }
  GetAPIProductsDatas() {
    this.productsService.GetAllProducts().pipe(takeUntil(this.destroy$)).subscribe({next: (response) =>{if (response) { this.datas = response; console.log('produtos vindos diretamente do banco no product service', this.datas); }}, error: (erro) => {this.messageService.add({severity: 'error', summary: 'Erro', detail: 'erro ao carregar produtos', life: 3000}); this.router.navigate(['/dashboard'])}})
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
