import { Injectable } from '@angular/core';
import { EventoProduto } from 'src/app/models/enums/products/ProductEvent';
import { registroVenda } from 'src/app/models/Interfaces/products/events/registroVenda';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  public todasVendas: Array<registroVenda> = [];

  public atualizarLista(venda: registroVenda): void{
    this.todasVendas[this.todasVendas.length] = venda;
    this.setLocalStorage()
  }

  public setLocalStorage(): void{
    const todo = JSON.stringify(this.todasVendas);
    if (todo) {localStorage.setItem(EventoProduto.VEND_PRODUCT_EVENT, todo)};

  }

}
