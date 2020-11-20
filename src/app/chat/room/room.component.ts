import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private roomService: RoomService) {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}

