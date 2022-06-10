import { configure, makeObservable, observable } from 'mobx';

configure({ enforceActions: 'always' });

class CharacterStore {
  Characters: Map<string, Character> = new Map();

  constructor() {
    makeObservable(this, { Characters: observable });
  }
}

class Character {
  alias = '';

  ID = '';

  rank = -1;

  moved = false;
}

export default new CharacterStore();
