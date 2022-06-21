import { listItemType, RoomState } from '@/type/roomState';
// eslint-disable-next-line import/no-cycle
import roomStore from '@/model/room/store';
import Mock from '@/service/socket/mock';
import listStore from '@/model/list/store';
import authStore from '@/model/auth/store';
import characterStore from '@/model/Character/store';

class Room {
  socketService: any;

  // mock
  intervalID: ReturnType<typeof setInterval>;

  // mock
  mockListCount = 0;

  requestedCreateRoomName = '';

  constructor(socketService: any) {
    this.socketService = socketService;
    this.socketService.socket.on('created-room', this.createdRoom);
    this.socketService.socket.on('removed-room', Room.removedRoom);
    this.socketService.socket.on('join-room', Room.entrance);
    this.socketService.socket.on('play-game', Room.onPlay);
    this.intervalID = setInterval(() => {
      this.socketService.postMassage(
        'created-room',
        Mock.List[this.mockListCount]
      );
    }, 3000);
  }

  static onPlay = () => {
    roomStore.playOnRoom();
  };

  createdRoom = (item: listItemType) => {
    if (item) {
      const data = item as listItemType;
      this.mockListCount += 1;
      if (this.mockListCount > Mock.List.length) {
        clearInterval(this.intervalID);
      }
      listStore.addList(data);
      // 내가 만든방인 경우
      if (this.requestedCreateRoomName === item.name) {
        roomStore.createdRoom(item.ID);
        characterStore.setOwner(authStore.userID);
      }
    }
  };

  createRoom = (arg: { roomName: string; pw: string }) => {
    this.requestedCreateRoomName = arg.roomName;
    // mock
    const isUniqueName = [...listStore.list].every(
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
    listStore.remove(id);
    roomStore.clearRoom();
    characterStore.reset();
  };

  join = (nickname: string) => {
    if (nickname === '') {
      return;
    }
    // mock
    this.socketService.postMassage('join-room', {
      characters: [
        {
          ID: 'user3',
          nickname,
        },
        {
          ID: 'user2',
          nickname: '핑거스냅',
        },
        {
          ID: 'user1',
          nickname: '월리',
        },
      ],
    });
  };

  static entrance = (arg: {
    characters: { ID: string; nickname: string }[];
  }) => {
    characterStore.setCharacter(arg.characters);
  };

  play = () => {
    this.socketService.postMassage('play-game', { on: 1 });
  };
}

export default Room;
