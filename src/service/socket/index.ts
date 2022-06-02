import type { listItemType } from '@/type/roomState';
import Mock from './mock';
// @ts-ignore
import SocketMock from 'socket.io-mock';
import ListStore from '@/model/list/store';

class SocketClient {
  socket;

  mockListCount = 0;

  intervalID: ReturnType<typeof setInterval>;

  init = false;

  constructor() {
    this.socket = new SocketMock();
    this.init = true;
    this.socket.on('message', this.messageCallback);
    this.intervalID = setInterval(() => {
      this.socket.socketClient.emit('message', Mock.List[this.mockListCount]);
    }, 3000);
  }

  messageCallback = (message: any) => {
    this.listUpdate(message);
  };

  listUpdate = (item: listItemType) => {
    const data = item as listItemType;
    this.mockListCount += 1;
    if (this.mockListCount > Mock.List.length) {
      clearInterval(this.intervalID);
    }
    ListStore.addList(data);
  };
}

export default new SocketClient();
