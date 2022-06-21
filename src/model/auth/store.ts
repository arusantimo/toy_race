import { observable, action, configure, makeObservable } from 'mobx';

configure({ enforceActions: 'always' });

class AuthStore {
  userID = '';

  connectionID = '';

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

const authStore = new AuthStore();

export default authStore;
