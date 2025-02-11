import { ProductsDataTransferService } from './../../../../shared/components/products/products-data-transfer.service';
import { saleProductRequest } from 'src/app/models/Interfaces/products/request/saleProductRequest';
import { ProductsService } from './../../../../services/products/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetAllProductsResponse } from 'src/app/models/Interfaces/products/response/GetAllProductsResponse';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-venda-home',
  templateUrl: './venda-home.component.html',
  styleUrls: []
})
export class VendaHomeComponent {
  
}
