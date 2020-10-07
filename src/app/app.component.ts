import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from './model/message.model';
import { Room } from './model/room.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  users = [];
  currentUser = '';
  message = '';
  join = new Room();
  create = new Room();

  constructor(private socket: Socket) {
    this.socket.on('updatechat', (username: string, data: string) => {
      this.users.push(new Message(data, new Date().getTime(), username));
    });
    this.socket.on('roomcreated', (data: Room) => {
      this.socket.emit('adduser', data);
    });
  }

  ngOnInit(): void {
    this.socket.on('connect', () => { });
  }

  createRoom() {
    this.socket.emit('createroom', { username: this.currentUser });
  }

  joinRoom() {
    this.currentUser = this.join.username;
    this.socket.emit('adduser', this.join);
  }

  doPost() {
    this.socket.emit('sendchat', this.message);
  }

  ngOnDestroy(): void {
    this.socket.emit('disconnect', { username: this.currentUser });
  }

}
