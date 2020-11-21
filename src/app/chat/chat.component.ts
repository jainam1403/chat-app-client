import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Message } from '../model/message.model';
import { Room } from '../model/room.model';
import { UserDetails } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ChatStore } from './chat.store';

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
  targetPhoneNumber: number;
  isInValidNumber: boolean;

  constructor(private store: ChatStore, private socket: Socket, private auth: AuthenticationService,
    private userService: UserService) {
    this.socket.on('updatechat', (username: any, data: any) => {
      this.participant_id = data['participant_id'] ? data['participant_id'] : this.participant_id;
      // this.users.push(new Message(data['text'], new Date().getTime(), username, data['participant_id'], username));
    });
    this.socket.on('roomcreated', (data: Room) => {
      this.room_id = data['room'];
      data['username'] = this.details.phone_number;
      this.socket.emit('adduser', data);
    });
  }

  ngOnInit(): void {
    this.store.init();
    // this.socket.on('connect', () => { });
    // this.auth.profile().subscribe(
    //   user => {
    //     this.details = user;
    //     this.currentUser = user.phone_number;
    //   },
    //   err => {
    //     console.error(err);
    //   }
    // );
  }

  searchPhoneNumber() {
    this.userService.searchByPhoneNumber(this.currentUser, Number(this.targetPhoneNumber))
      .subscribe(res => {
        this.isInValidNumber = !res;
        if (res) {
          this.socket.emit('directChat', { created_by: this.currentUser, username: Number(this.targetPhoneNumber) });
        }
      });
  }

  createRoom() {
    this.socket.emit('createroom', { username: this.details.phone_number });
  }

  joinRoom(form: NgForm) {
    console.log('form : ', form.control.get('code').value);
    this.join.room = ''+form.control.get('code').value;
    this.join.username = this.details.phone_number;
    // this.currentUser - this.details.phone_number;
    this.socket.emit('adduser', this.join);
    form.reset();
  }

  doPost() {
    this.socket.emit('sendchat', { message: this.message, participant_id: this.participant_id });
    setTimeout(() => {
      this.message = null;
    }, 500);
  }

  ngOnDestroy(): void {
    this.socket.emit('disconnect', { username: this.currentUser });
  }

}
