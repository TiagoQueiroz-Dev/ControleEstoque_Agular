import { ProductsDataTransferService } from './../../../../shared/components/products/products-data-transfer.service';
import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/Interfaces/products/response/GetAllProductsResponse';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public products: Array<GetAllProductsResponse> = []

  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions;

  constructor(
    private productsService: ProductsService, private messageService: MessageService,private productsDataTransferService: ProductsDataTransferService
  ){}
  ngOnInit(): void {
    this.loadDataProducts();
  }
  loadDataProducts(): void{
    this.productsService.GetAllProducts().pipe(takeUntil(this.destroy$)).subscribe({next: (result) => {if (result.length > 0) { this.products = result;this.productsDataTransferService.setProductsDatas(this.products), this.setProductsChartConfig() }}, error: (erro) =>{this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possivel carregar os produtos', life: 2000}), console.log(erro)}});
  }
  setProductsChartConfig(): void{
    if(this.products.length > 0){
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.productsChartDatas = {
        labels: this.products.map((element) => element.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
            data: this.products.map((element) => element?.amount),
          },
        ],
      };

      this.productsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },

        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks:{
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        },
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
