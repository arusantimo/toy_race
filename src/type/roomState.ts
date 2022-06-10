export enum RoomState {
  'inReady',
  'inPlay',
}

export interface listItemType extends roomRequestPramType {
  state: RoomState;
  userCounter: number;
}

export interface roomRequestPramType {
  ID: string;
  name: string;
  password: boolean;
}
