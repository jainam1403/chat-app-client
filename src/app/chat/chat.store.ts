import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../model/message.model';
import { Participant } from '../model/participants.model';
import { UserDetails } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';
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
        private auth: AuthenticationService) {
        this._state$ = new BehaviorSubject(new ChatState());
        this.state$ = this._state$.asObservable();
        this.socket.on('connect', () => { });
        this.socket.on('acknowledgeUser', data => this.getParticipants());
    }

    init() {
        this.auth.profile().subscribe(user => this.currentUser = user);
    }

    get state(): ChatState {
        return this._state$.getValue();
    }

    setState(nextState: ChatState): void {
        this._state$.next(nextState);
    }

    onMessage(msg: string) {
        const message = new Message(msg, moment(new Date()), this.state.currentParticipant.room_id, this.state.currentParticipant.id,
            this.currentUser.phone_number, this.state.currentParticipant.user_id);
        this.socket.emit('sendchat', { message: message });
        this.socket.on('receivechat', (username: any, data: any) => {
            console.log('data ', data.message, username);
            this.state.messages.push(data.message);
        });
    }

    addNumber(phoneNumber: number) {
        if (this.currentUser) {
            this.userService.searchByPhoneNumber(this.currentUser.phone_number, phoneNumber)
                .subscribe(res => {
                    if (res) {
                        // valid phone number
                        this.socket.emit('directChat', {
                            created_by: this.currentUser.phone_number,
                            username: phoneNumber
                        });
                    } else {
                        // throw error
                        // toast error invalid number or number is not registered
                    }
                });
        } else {
            this.auth.profile().subscribe(user => {
                this.currentUser = user;
                this.userService.searchByPhoneNumber(this.currentUser.phone_number, phoneNumber)
                    .subscribe(res => {
                        if (res) {
                            // valid phone number
                            this.socket.emit('directChat', {
                                created_by: this.currentUser.phone_number,
                                username: phoneNumber
                            });
                        } else {
                            // throw error
                            // toast error invalid number or number is not registered
                        }
                    });
            });
        }
    }

    getParticipants() {
        if (this.currentUser) {
            this.roomService.findByCreatedBy(this.currentUser.phone_number).subscribe(res => {
                this.state.participants = res;
            });
        } else {
            this.auth.profile().subscribe(user => {
                this.roomService.findByCreatedBy(this.currentUser.phone_number).subscribe(res => {
                    this.state.participants = res;
                });
            });
        }
    }

    setCurrentParticipants(participant: Participant) {
        this.state.currentParticipant = participant;
        this.messageService.findByParticipantId(participant.id).subscribe(res => {
            this.state.messages = res;
        });
        this.socket.emit('joinroom', { room_id: participant.room_id });
    }
}