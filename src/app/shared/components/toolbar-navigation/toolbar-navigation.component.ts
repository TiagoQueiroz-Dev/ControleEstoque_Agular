import { DialogService } from 'primeng/dynamicdialog';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EventoProduto } from 'src/app/models/enums/products/ProductEvent';
import { ProductFormComponent } from 'src/app/modules/products/components/product-form/product-form/product-form.component';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: []
})
export class ToolbarNavigationComponent {
 constructor(private cookieService: CookieService, private router: Router, private dialogService: DialogService){}
 


 Logoutuser(): void{
  this.cookieService.delete('TOKEN_INFO');
  this.router.navigate(['/home']);
 }

 handleSaleProduct(): void{
  const saleProduct = EventoProduto.VEND_PRODUCT_EVENT;
  this.dialogService.open(ProductFormComponent,{
    header: saleProduct,
    width: '70%',
    contentStyle: {overflow: 'auto'},
    baseZIndex: 10000,
    maximizable: true,
    data: {
      event: {action: saleProduct}
    }
  })
 }

}
