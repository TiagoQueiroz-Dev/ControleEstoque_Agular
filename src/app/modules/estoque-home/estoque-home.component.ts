import { CookieService } from 'ngx-cookie-service';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/Interfaces/users/Auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/Interfaces/users/SignUserRequest';
import { UserService } from 'src/app/services/user/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-estoque-home',
  templateUrl: './estoque-home.component.html',
  styleUrls: ['./estoque-home.component.scss']
})
export class EstoqueHomeComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  loginCard = true;
  loginForm = this.formBuilder.group({
    email:['',Validators.required],
    password: ['',Validators.required],
  });
  singupForm = this.formBuilder.group({
    name:['',Validators.required],
    email:['',Validators.required],
    password: ['',Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ){}


  onSubmitLoginForm(): void{
    //console.log('dados de login', this.loginForm.value);
    this.userService.authUser(this.loginForm.value as AuthRequest).pipe(takeUntil(this.destroy$)).subscribe({next: (response)=> {if(response){this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `Bem vindo de volta ${response.name}!`,
      life: 2000
    }),this.cookieService.set('TOKEN_INFO',response.token),this.loginForm.reset(),this.router.navigate(['/dashboard'])}}, error: (erro) => this.messageService.add({
      severity: 'error',
      summary: 'Falha no Login',
      detail: 'Verifique se os campos foram preenchidos corretamente',
      life: 2000
    })});
  }
  onSubmitsingupForm(): void{
    //console.log('dados de login', this.singupForm.value);
    this.userService.signupUser(this.singupForm.value as SignupUserRequest).pipe(takeUntil(this.destroy$)).subscribe({next: (response)=> {if(response){this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `O usuario ${response.name} foi adicionado com sucesso`,
      life: 2000
    });}},error: (err) => {this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao incluir usuario',
      life: 2000
    }), console.log(err)}});
    this.singupForm.reset();
    this.loginCard = true;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
