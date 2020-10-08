import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Message } from './model/message.model';
import { Room } from './model/room.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // users = [];
  // currentUser = '';
  // message = '';
  // join = new Room();
  // create = new Room();

  constructor(private router: Router, public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.router.navigateByUrl('register');
    // this.socket.on('connect', () => { });
  }

  // createRoom() {
  //   this.socket.emit('createroom', { username: this.currentUser });
  // }

  // joinRoom() {
  //   this.currentUser = this.join.username;
  //   this.socket.emit('adduser', this.join);
  // }

  // doPost() {
  //   this.socket.emit('sendchat', this.message);
  // }

  // ngOnDestroy(): void {
  //   this.socket.emit('disconnect', { username: this.currentUser });
  // }

}