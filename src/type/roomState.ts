export enum RoomState {
  'inReady',
  'inPlay',
}

export interface listItemType extends roomRequestPramType {
  state: RoomState;
}

export interface roomRequestPramType {
  ID: string;
  name: string;
  password: boolean;
}
