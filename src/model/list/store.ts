import type { listItemType } from '@/type/roomState';
import { RoomState } from '@/type/roomState';
import { action, configure, makeObservable, observable } from 'mobx';

configure({ enforceActions: 'always' });

class ListStore {
  list: Map<string, Item> = new Map();

  static makeMap = (list: Array<Item>) => {
    const map: Map<string, Item> = new Map();
    list.forEach((item) => {
      map.set(item.ID, new Item(item));
    });
    return map;
  };

  addList = (item: Item) => {
    this.list.set(item.ID, new Item(item));
  };

  setList = (list: Array<Item>) => {
    this.list = ListStore.makeMap(list);
  };

  mutateList = (item: Item) => {
    this.list.set(item.ID, new Item(item));
  };

  remove = (id: string) => {
    this.list.delete(id);
  };

  constructor() {
    makeObservable(this, {
      list: observable,
      addList: action,
      remove: action,
      setList: action,
      mutateList: action,
    });
  }

  // get roomInfo(): listItemType | undefined {
  //   return this.list.get(roomStore.createdID ?? '');
  // }
}

const listStore = new ListStore();

class Item {
  readonly ID;

  readonly password;

  readonly name;

  state: RoomState = RoomState.inReady;

  constructor(item: listItemType) {
    this.ID = item.ID;
    this.name = item.name;
    this.password = item.password;
    makeObservable(this, {
      state: observable,
    });
  }

  public setPlay = () => {
    this.state = RoomState.inPlay;
  };

  setReady = () => {
    this.state = RoomState.inReady;
  };
}

export default listStore;
