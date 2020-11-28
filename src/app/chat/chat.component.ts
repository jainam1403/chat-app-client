import { Component, OnInit } from '@angular/core';
import { ChatStore } from './chat.store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(private store: ChatStore) { }

  ngOnInit(): void {
    this.store.init();
  }

}
