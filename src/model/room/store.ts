import { observable, action, configure, makeObservable } from 'mobx';
import socket from '@/service/socket';
import { RoomState } from '@/type/roomState';

configure({ enforceActions: 'always' });

class RoomStore {
  warningMessage = '';

  createdID = '';

  player: Array<string> = [];

  state: RoomState = RoomState.inReady;

  constructor() {
    makeObservable(this, {
      warningMessage: observable,
      createdID: observable,
      setWarningMessage: action,
      setCreatedID: action,
    });
  }

  setWarningMessage = (message: string) => {
    this.warningMessage = message;
  };

  setCreatedID = (id: string) => {
    this.createdID = id;
  };

  createdRoom = (id: string) => {
    this.createdID = id;
    this.player = [];
    this.state = RoomState.inReady;
  };

  clearRoom = () => {
    this.createdID = '';
    this.warningMessage = '';
    this.player = [];
    this.state = RoomState.inReady;
  };

  exit = () => {
    window.history.replaceState({}, '', '/');
    socket.room.removeRoom(this.createdID);
  };
}

const store = new RoomStore();

export default store;
