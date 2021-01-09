import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';
import { LinkifyPipe } from 'src/app/pipe/LinkifyPipe.pipe';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() message: Message;

  @Input() currentUserId: number;

  constructor(private linkifyPipe: LinkifyPipe) { }

  ngOnInit() {
    this.message.message = this.linkifyPipe.transform(this.message.message);
  }

}
