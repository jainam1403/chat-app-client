export class Participant {
  public id: number;
  public room_id: number;
  public user_id: number;

  constructor(id?: number, room_id?: number, user_id?: number) {
    this.room_id = room_id;
    this.id = id;
    this.user_id = user_id;
  }
}
