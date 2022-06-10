import { observable, action, configure, makeObservable } from 'mobx';

configure({ enforceActions: 'always' });

class AuthStore {
  connectionID = '';

  userID = '';

  constructor() {
    makeObservable(this, {
      connectionID: observable,
      connected: action,
    });
  }

  connected = (id: string, userID: string) => {
    this.connectionID = id;
    this.userID = userID;
  };
}

const store = new AuthStore();

export default store;
