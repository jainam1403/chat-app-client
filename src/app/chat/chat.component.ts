import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../model/message.model';
import { Room } from '../model/room.model';
import { UserDetails } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  details: UserDetails;
  users = [];
  currentUser = '';
  message = '';
  join = new Room();
  create = new Room();

  constructor(private socket: Socket, private auth: AuthenticationService) {
    this.socket.on('updatechat', (username: string, data: string) => {
      this.users.push(new Message(data, new Date().getTime(), username));
    });
    this.socket.on('roomcreated', (data: Room) => {
      this.socket.emit('adduser', data);
    });
  }

  ngOnInit(): void {
    this.socket.on('connect', () => { });
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );
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
