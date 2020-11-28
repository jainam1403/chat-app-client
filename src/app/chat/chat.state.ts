import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../model/message.model';
import { Participant } from '../model/participants.model';
import { Room } from '../model/room.model';

export class ChatState {
    messages: Message[] = [];
    stableRooms: Room[] = [];
    private _rooms$: BehaviorSubject<Room[]> = new BehaviorSubject(null);
    currentRoom: Room;
    constructor() { }

    public getRooms(): Observable<Room[]> {
        return this._rooms$.asObservable();
    }
    public setRooms$(value: Room[]) {
        this.stableRooms = value ? value : [];
        this._rooms$.next(value);
    }
}