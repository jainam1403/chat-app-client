import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatStore } from '../chat.store';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  message: string;

  constructor(public store: ChatStore) { }

  ngOnInit() {
  }

  onMessage(form: NgForm) {
    this.store.onMessage(this.message);
    form.reset();
  }

}
