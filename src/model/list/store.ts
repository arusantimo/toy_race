import type { listItemType } from '@/type/roomState';
import { observable, action, configure, makeObservable } from 'mobx';

configure({ enforceActions: 'always' });

class ListStore {
  constructor() {
    makeObservable(this, {
      list: observable,
      addList: action,
    });
  }

  list: Map<string, listItemType> = new Map();

  addList = (item: listItemType) => {
    this.list.set(item.ID, item);
  };
}

const store = new ListStore();

export default store;
