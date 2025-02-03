import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';
import { CategoriesService } from './../../../../services/categories/categories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: []
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  public AllCategories: Array<categoriesResponse> = []

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ){}



  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
   this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe({next: (response) => {if(response.length > 0){this.AllCategories = response}}, error: (erro) => {console.log(erro), this.router.navigate(['/dashboard'])}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
