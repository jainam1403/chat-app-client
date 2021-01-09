import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from 'src/app/model/room.model';
import { ToastrService } from 'src/app/services/toastr.service';
import { ChatStore } from '../chat.store';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {

  ownRooms: Room[] = [];
  participantRooms: Room[] = [];
  invitations: Room[] = [];
  phoneNumber: number;

  constructor(public store: ChatStore, private toastService: ToastrService) {
    this.store.state.getRooms().subscribe(res => {
      if (res) {
        const rooms = res.filter(r => r.is_invited !== true && r.status !== 'declined');
        this.ownRooms = rooms.filter(r => r.created_by === this.store.currentUser.phone_number);
        this.participantRooms = rooms.filter(r => r.created_by !== this.store.currentUser.phone_number);
        this.invitations = res.filter(r => r.is_invited);
        this.store.state.setRooms$(null)
      }
    });
  }

  ngOnInit(): void { }

  keyPress(event: any) {
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  add(form: NgForm) {
    console.log('form ', this.phoneNumber !== this.store.currentUser.phone_number,
      this.phoneNumber, this.store.currentUser.phone_number);
    if ((+this.phoneNumber) !== (+this.store.currentUser.phone_number)) {
      this.store.addNumber(this.phoneNumber);
      form.reset();
    } else {
      this.toastService.show('Your mobile number can\'t be on chat', {
        classname: 'bg-danger text-light',
        delay: 2000,
        autohide: true
      });
    }
  }

  onSelect(room: Room) {
    this.store.setCurrentRoom(room);
  }

  onInvitation(isAccept: boolean, invitation: Room) {
    this.store.onActionInvitation(isAccept, invitation);
  }
}

