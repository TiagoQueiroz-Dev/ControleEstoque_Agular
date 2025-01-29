import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/Interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {

  public productsdataemiter$ = new BehaviorSubject <Array<GetAllProductsResponse> | null>(null);
  public productsDatas: Array<GetAllProductsResponse> = []


  setProductsDatas(product: Array<GetAllProductsResponse>): void{
    if (this.productsDatas) {
      this.productsdataemiter$.next(product);
    this.getProductsDatas();
    }
  }
    getProductsDatas() {
      this.productsdataemiter$.pipe(take(1),map((data) => data?.filter((product) => product.amount > 0))).subscribe({next: (data) => {if (data) { this.productsDatas = data }}})
      return this.productsDatas;
    }
}

