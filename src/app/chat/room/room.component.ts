import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant } from 'src/app/model/participants.model';
import { ChatStore } from '../chat.store';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {

  phoneNumber: number;

  constructor(public store: ChatStore) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.store.getParticipants();
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  add(form: NgForm) {
    this.store.addNumber(this.phoneNumber);
    form.reset();
  }

  onSelect(participant: Participant) {
    this.store.setCurrentParticipants(participant);
  }
}

