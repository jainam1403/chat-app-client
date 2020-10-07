export class Message {
  public message: string;
  public time: number;
  public username: string
  constructor(message: string, time: number, username: string) {
    this.message = message;
    this.time = time;
    this.username = username;
  }
}
