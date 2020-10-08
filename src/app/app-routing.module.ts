import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guard/guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: SignInComponent },
  { path: "register", component: RegisterComponent },
  { path: "chat", component: ChatComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
