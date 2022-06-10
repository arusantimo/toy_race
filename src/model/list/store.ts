import type { listItemType } from '@/type/roomState';
import { observable, action, configure, makeObservable } from 'mobx';

configure({ enforceActions: 'always' });

class ListStore {
  list: Map<string, listItemType> = new Map();

  static makeMap = (list: Array<listItemType>) => {
    const map: Map<string, listItemType> = new Map();
    list.forEach((item) => {
      map.set(item.ID, item);
    });
    return map;
  };

  addList = (item: listItemType) => {
    this.list.set(item.ID, item);
  };

  mutateList = (list: Array<listItemType>) => {
    this.list = ListStore.makeMap(list);
  };

  remove = (id: string) => {
    this.list.delete(id);
  };

  constructor() {
    makeObservable(this, {
      list: observable,
      addList: action,
      remove: action,
      mutateList: action,
    });
  }
}

const store = new ListStore();

export default store;
