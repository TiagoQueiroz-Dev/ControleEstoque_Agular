import { ProductsDataTransferService } from './../../../../shared/components/products/products-data-transfer.service';
import { saleProductRequest } from 'src/app/models/Interfaces/products/request/saleProductRequest';
import { ProductsService } from './../../../../services/products/products.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { GetAllProductsResponse } from 'src/app/models/Interfaces/products/response/GetAllProductsResponse';
import { Subject, takeUntil } from 'rxjs';
import { registroVenda } from 'src/app/models/Interfaces/products/events/registroVenda';
import { EventoProduto } from './../../../../models/enums/products/ProductEvent';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-venda-home',
  templateUrl: './venda-home.component.html',
  styleUrls: []
})
export class VendaHomeComponent implements OnInit {

  constructor(
    private cardModule: CardModule,
  ){}
  ngOnInit(): void {
   this.gettodasVendasInLocalStorage();
  }

  public todasVendas: Array<registroVenda> = [];

  public gettodasVendasInLocalStorage(): void{
    const Vendas = localStorage.getItem(EventoProduto.VEND_PRODUCT_EVENT) as string
    if (Vendas) {this.todasVendas = JSON.parse(Vendas),console.log(Vendas);}

   }

}
