import { Message } from '../model/message.model';
import { Participant } from '../model/participants.model';

export class ChatState {
    messages: Message[] = [];
    participants: Participant[] = [];
    currentParticipant: Participant;
    constructor() {}
}