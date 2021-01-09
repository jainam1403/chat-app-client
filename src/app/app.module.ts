import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatStore } from './chat/chat.store';
import { MessagesComponent } from './chat/messages/messages.component';
import { RoomComponent } from './chat/room/room.component';
import { UserChatComponent } from './chat/user-chat/user-chat.component';
import { HomeComponent } from './home/home.component';
import { LinkifyPipe } from './pipe/LinkifyPipe.pipe';
import { RegisterComponent } from './register/register.component';
import { ToastrService } from './services/toastr.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { ToastComponent } from './toast/toast.component';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ChatComponent,
    RegisterComponent,
    HomeComponent,
    UserChatComponent,
    RoomComponent,
    MessagesComponent,
    ToastComponent,
    LinkifyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    NgbModule
  ],
  providers: [ChatStore, ToastrService, LinkifyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
