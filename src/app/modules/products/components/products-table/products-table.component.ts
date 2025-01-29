import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventoProduto } from 'src/app/models/enums/products/ProductEvent';
import { EventAction } from 'src/app/models/Interfaces/products/events/eventAction';
import { GetAllProductsResponse } from 'src/app/models/Interfaces/products/response/GetAllProductsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent {
  @Input() product: Array<GetAllProductsResponse> = []
  @Output() productEvent = new EventEmitter<EventAction>;

  public productSelected!: GetAllProductsResponse;
  public addProductEvent = EventoProduto.ADD_PRODUCT_EVENT;
  public editProductEvent = EventoProduto.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void{
    const eventData = id && id !== ''? {action,id} : {action}
    this.productEvent.emit(eventData);
  }
}
