import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../model/message.model';
import { Room } from '../model/room.model';
import { UserDetails } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from '../services/toastr.service';
import { UserService } from '../services/user.service';
import { ChatState } from './chat.state';
import { MessageService } from './messages/messages.service';
import { RoomService } from './room/room.service';

@Injectable()
export class ChatStore {
    currentUser: UserDetails;
    state$: Observable<ChatState>;
    private _state$: BehaviorSubject<ChatState>;

    constructor(private roomService: RoomService, private socket: Socket,
        private userService: UserService,
        private messageService: MessageService,
        private toastService: ToastrService,
        private auth: AuthenticationService) {
        this._state$ = new BehaviorSubject(new ChatState());
        this.state$ = this._state$.asObservable();
        this.socket.on('error', (data) => {
            this.toastService.show(data, {
                classname: 'bg-danger text-light',
                delay: 2000,
                autohide: true
            });
        });
        this.socket.on('alreadyExist', (data) => {
            this.toastService.show(data, {
                classname: 'bg-danger text-light',
                delay: 2000,
                autohide: true
            });
        });
        this.socket.on('invitedSuccess', (data) => this.setLatestRoom(data));
        this.socket.on('roomDeclined', (data) => this.setLatestRoom(data));
        this.socket.on('roomJoined', (data) => this.setLatestRoom(data));
        this.socket.on('receivechat', (data: Message) => {
            console.log('datanew ', data);
            this.state.messages.push(data);
        });
    }

    private setLatestRoom(data: any) {
        if (this.state.stableRooms) {
            const index = this.state.stableRooms.findIndex(s => s.id === data.id);
            if (index >= 0) {
                this.state.stableRooms[index] = data;
            } else {
                this.state.stableRooms.push(data);
            }
            this.state.setRooms$(this.state.stableRooms);
        }
    }

    init() {
        this.auth.profile().subscribe(user => {
            console.log('data connect to socket ');
            this.socket.emit('connecttoUser', { user_id: user.phone_number });
            this.currentUser = user;
            this.getCombineData();
        });
    }

    get state(): ChatState {
        return this._state$.getValue();
    }

    setState(nextState: ChatState): void {
        this._state$.next(nextState);
    }

    onMessage(msg: string) {
        const receiver = this.state.currentRoom.receiver === this.currentUser.phone_number ? this.state.currentRoom.created_by : this.state.currentRoom.receiver;
        const message = new Message(msg, moment(new Date()), this.state.currentRoom.id, this.currentUser.phone_number, receiver, null);
        this.state.messages.push(message);
        this.socket.emit('sendchat', message);
    }

    onActionInvitation(isAccept: boolean, invitation: Room) {
        this.socket.emit(isAccept ? 'acceptUser' : 'declineUser', { room_id: invitation.id });
    }

    addNumber(phoneNumber: number) {
        this.userService.searchByPhoneNumber(this.currentUser.phone_number, phoneNumber)
            .subscribe(res => {
                if (res) {
                    // valid phone number
                    this.socket.emit('inviteUser', {
                        created_by: this.currentUser.phone_number,
                        receiver: phoneNumber
                    });
                } else {
                    // throw error
                    // toast error invalid number or number is not registered
                    this.toastService.show('Invalid phone number', {
                        classname: 'bg-danger text-light',
                        delay: 2000,
                        autohide: true
                    });
                }
            });
    }

    getCombineData() {
        // get rooms, get invitations
        this.roomService.findByUserId(this.currentUser.phone_number)
            .subscribe(res => {
                this.state.setRooms$(res);
            });
    }

    setCurrentRoom(room: Room) {
        this.state.currentRoom = room;
        this.messageService.findByParticipantId(room.id).subscribe(res => {
            this.state.messages = [...res];
        });
    }
}