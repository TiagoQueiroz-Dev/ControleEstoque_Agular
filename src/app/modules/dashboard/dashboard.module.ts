import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Dashboard_routes } from './dashboard.routing';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { SidebarModule } from "primeng/sidebar";
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartModule } from "primeng/chart";


@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Dashboard_routes),
    //primeNG
    CardModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    SidebarModule,
    SharedModule,
    ChartModule,
  ],
  providers: [CookieService,MessageService],
})
export class DashboardModule { }
