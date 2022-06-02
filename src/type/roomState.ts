export enum RoomState {
  'inReady',
  'inPlay',
}

export interface listItemType {
  users: string[];
  password: boolean;
  name: string;
  state: RoomState;
  ID: string;
}
