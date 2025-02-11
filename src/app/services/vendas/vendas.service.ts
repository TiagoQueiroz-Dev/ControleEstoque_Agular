import { Injectable } from '@angular/core';
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
    if (todo) {localStorage.setItem('ListaProdutos', todo)};

  }

}
