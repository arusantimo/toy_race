import { action, computed, configure, makeObservable, observable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import socket from '@/service/socket';
import listStore from '@/model/list/store';
import { RoomState } from '@/type/roomState';

configure({ enforceActions: 'always' });

class RoomStore {
  warningMessage = '';

  createdID = '';

  state: RoomState = RoomState.inReady;

  constructor() {
    makeObservable(this, {
      warningMessage: observable,
      createdID: observable,
      state: observable,
      setWarningMessage: action,
      setCreatedID: action,
      playOnRoom: action,
      roomInfo: computed,
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
    this.state = RoomState.inReady;
  };

  clearRoom = () => {
    this.createdID = '';
    this.warningMessage = '';
    this.state = RoomState.inReady;
  };

  exit = () => {
    window.history.replaceState({}, '', '/');
    socket.room.removeRoom(this.createdID);
  };

  get roomInfo() {
    return listStore.list.get(this.createdID);
  }

  playOnRoom = () => {
    this.state = RoomState.inPlay;
    const room = this.roomInfo;
    if (room) {
      room.setPlay();
    }
  };
}

const roomStore = new RoomStore();

export default roomStore;
