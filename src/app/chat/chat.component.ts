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
  currentUser: number;
  message = '';
  join = new Room();
  create = new Room();
  room_id: number;
  participant_id: number;

  constructor(private socket: Socket, private auth: AuthenticationService) {
    this.socket.on('updatechat', (username: any, data: any) => {
      console.log(username, data);
      this.participant_id = data['participant_id'] ? data['participant_id'] : this.participant_id;
      this.users.push(new Message(data['text'], new Date().getTime(), username, data['participant_id'], username));
    });
    this.socket.on('roomcreated', (data: Room) => {
      this.room_id = data['room'];
      data['username'] = this.details.phone_number;
      this.socket.emit('adduser', data);
    });
  }

  ngOnInit(): void {
    this.socket.on('connect', () => { });
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        this.currentUser = user.phone_number;
      },
      err => {
        console.error(err);
      }
    );
  }

  createRoom() {
    this.socket.emit('createroom', { username: this.details.phone_number });
  }

  joinRoom() {
    this.join.username = this.details.phone_number;
    this.currentUser - this.details.phone_number;
    this.socket.emit('adduser', this.join);
  }

  doPost() {
    this.socket.emit('sendchat', { message: this.message, participant_id: this.participant_id });
  }

  ngOnDestroy(): void {
    this.socket.emit('disconnect', { username: this.currentUser });
  }

}
