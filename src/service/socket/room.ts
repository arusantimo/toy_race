import { listItemType, RoomState } from '@/type/roomState';
import RoomStore from '@/model/room/store';
import Mock from '@/service/socket/mock';
import ListStore from '@/model/list/store';

class Room {
  socketService: any;

  intervalID: ReturnType<typeof setInterval>;

  mockListCount = 0;

  requestedCreateRoomName = '';

  constructor(socketService: any) {
    this.socketService = socketService;
    this.socketService.socket.on('created-room', this.createdRoom);
    this.socketService.socket.on('removed-room', Room.removedRoom);
    this.intervalID = setInterval(() => {
      this.socketService.postMassage(
        'created-room',
        Mock.List[this.mockListCount]
      );
    }, 3000);
  }

  createdRoom = (item: listItemType) => {
    if (item) {
      const data = item as listItemType;
      this.mockListCount += 1;
      if (this.mockListCount > Mock.List.length) {
        clearInterval(this.intervalID);
      }
      ListStore.addList(data);

      // 내가 만든방인 경우
      if (this.requestedCreateRoomName === item.name) {
        RoomStore.createdRoom(item.ID);
      }
    }
  };

  createRoom = (arg: { roomName: string; pw: string }) => {
    this.requestedCreateRoomName = arg.roomName;
    // mock
    const isUniqueName = [...ListStore.list].every(
      (item) => item[1].name !== arg.roomName
    );
    if (isUniqueName) {
      this.socketService.postMassage('created-room', {
        userCounter: 1,
        password: arg.pw.length > 0,
        name: arg.roomName,
        state: RoomState.inReady,
        ID: this.mockListCount.toString(),
      });
    } else {
      this.socketService.postMassage(
        'warning',
        '게임방 이름이 중복 되었습니다.'
      );
    }
  };

  removeRoom = (id: string) => {
    // mock
    this.socketService.postMassage('removed-room', id);
  };

  static removedRoom = (id: string) => {
    ListStore.remove(id);
    RoomStore.clearRoom();
  };
}

export default Room;
