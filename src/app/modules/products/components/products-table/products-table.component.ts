import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventoProduto } from 'src/app/models/enums/products/ProductEvent';
import { deleteActionProduct } from 'src/app/models/Interfaces/products/events/deleteActionProduct';
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
  @Output() deleteProduct = new EventEmitter<deleteActionProduct>;

  public productSelected!: GetAllProductsResponse;
  public addProductEvent = EventoProduto.ADD_PRODUCT_EVENT;
  public editProductEvent = EventoProduto.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void{
    if (action && action !== '') {
      const eventData = id && id !== ''? {action,id} : {action}
    this.productEvent.emit(eventData);
    }
  }

  handleDeleteproduct(id: string, name: string){
    id !== '' && name !== '' ? this.deleteProduct.emit({id,name}) : console.log('ID OU NOME VAZIO');
  }
}
