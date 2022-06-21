import authStore from '@/model/auth/store';
import { action, computed, configure, makeObservable, observable } from 'mobx';

configure({ enforceActions: 'always' });

class CharacterStore {
  owner = '';

  characters: Map<string, Character> = new Map();

  constructor() {
    makeObservable(this, {
      characters: observable,

      add: action,
      setCharacter: action,

      setOwner: action,
      reset: action,
      myCharacter: computed,
      characterList: computed,
    });
  }

  add = (id: string, alias: string) => {
    this.characters.set(id, new Character(id, alias));
  };

  setCharacter = (characters: { ID: string; nickname: string }[]) => {
    const characterMap: Map<string, Character> = new Map();
    characters.forEach((character) => {
      characterMap.set(
        character.ID,
        new Character(character.ID, character.nickname)
      );
    });
    this.characters = characterMap;
  };

  get myCharacter(): Character | undefined {
    return this.characters.get(authStore.userID);
  }

  get characterList(): Character[] {
    const list: Character[] = [];
    this.characters.forEach((character) => {
      list.push(character);
    });
    return list;
  }

  reset = () => {
    this.owner = '';
    this.characters = new Map();
  };

  setOwner = (id: string) => {
    this.owner = id;
  };
}

class Character {
  nickname = '';

  ID = '';

  rank = -1;

  moved = false;

  constructor(ID: string, alias: string) {
    makeObservable(this, { rank: observable, moved: observable });
    this.ID = ID;
    this.nickname = alias;
  }
}

export default new CharacterStore();
