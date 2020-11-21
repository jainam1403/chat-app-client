import * as moment from 'moment';

export class Message {
  public message: string;
  public message_on: moment.Moment;
  public room_id: number;
  public participant_id: number;
  public sender: number;
  public receiver: number;
  public id: number;
  constructor(message?: string, message_on?: moment.Moment, room_id?: number, participant_id?: number,
    sender?: number, receiver?: number, id?: number) {
    this.message = message;
    this.participant_id = participant_id;
    this.room_id = room_id;
    this.message_on = message_on;
    this.sender = sender;
    this.receiver = receiver;
    this.id = id;
  }
}
