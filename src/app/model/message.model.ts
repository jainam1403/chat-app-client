export class Message {
  public message: string;
  public time: number;
  public room_id: number;
  public participant_id: number;
  public username: any;
  constructor(message: string, time: number, room_id: number, participant_id: number, username: any) {
    this.message = message;
    this.username = username;
    this.time = time;
    this.participant_id = participant_id;
    this.room_id = room_id;
  }
}
