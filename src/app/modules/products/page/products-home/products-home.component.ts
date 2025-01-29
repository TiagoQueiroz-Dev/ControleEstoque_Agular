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

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  public datas: Array<GetAllProductsResponse> = [];


  constructor (private productsService: ProductsService, private productsDataTransferService: ProductsDataTransferService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService){}

  handleProductAction(event: EventAction): void{
    if (event) {
      console.log('deu bom', event);
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
    if (id) {alert(id) }
  }

  ngOnInit(): void {
    this.getServiceProductDatas()
  }
  getServiceProductDatas() {

    const productsLoaded = this.productsDataTransferService.getProductsDatas();

    if (productsLoaded.length > 0) {
      this.datas = productsLoaded;
      console.log('Dados dos produtos', this.datas);
    }else{
      this.GetAPIProductsDatas();
    }
  }
  GetAPIProductsDatas() {
    this.productsService.GetAllProducts().pipe(takeUntil(this.destroy$)).subscribe({next: (response) =>{if (response) { this.datas = response; console.log('Dados dos produtos', this.datas); }}, error: (erro) => {this.messageService.add({severity: 'error', summary: 'Erro', detail: 'erro ao carregar produtos', life: 3000}); this.router.navigate(['/dasboard'])}})
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
