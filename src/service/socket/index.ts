import type { listItemType } from '@/type/roomState';
import ListStore from '@/model/list/store';
import AuthStore from '@/model/auth/store';
// @ts-ignore
import SocketMock from 'socket.io-mock';
import Room from '@/service/socket/room';

class SocketClient {
  socket;

  init = false;

  room: Room;

  constructor() {
    // Mock
    this.socket = new SocketMock();
    this.init = true;
    this.socket.on('connect', SocketClient.connected);
    this.socket.on('warning', this.warning);
    this.room = new Room(this);
    // Mock
    this.postMassage('connect', {
      list: [
        {
          users: ['user1', 'user2', 'user3'],
          password: true,
          name: '게임방10',
          state: 'inPlay',
          ID: 'id10',
        },
      ],
    });
  }

  warning = () => {};

  static connected = (message: any) => {
    const { list } = message as {
      list: Array<listItemType>;
    };
    ListStore.mutateList(list);
    AuthStore.connected(Date.toString(), 'user4');
  };

  postMassage = (target: string, data: any) => {
    if (this.socket) {
      this.socket.socketClient.emit(target, data);
    }
  };
}

export default new SocketClient();
