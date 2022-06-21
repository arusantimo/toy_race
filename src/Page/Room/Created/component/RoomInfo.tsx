import useStores from '@/hook/injectStore';
import { RoomState } from '@/type/roomState';
import { useObserver } from 'mobx-react';

const RoomInfo = () => {
  const { roomStore, characterStore } = useStores();
  const { roomInfo } = roomStore;

  const myCharacterInfo = characterStore.myCharacter;
  if (!roomInfo) return <></>;
  console.log(roomInfo.state);
  return useObserver(() => (
    <>
      <h2>게임방 이름 - {roomInfo.name}</h2>
      {roomInfo.password && <p>비밀번호: {roomInfo.password}</p>}
      <h3>접속한 유저{characterStore.characterList.length}명</h3>
      <p>
        게임상태{roomInfo.state === RoomState.inReady ? '대기중' : '게임중'}
      </p>
      <ul>
        {characterStore.characterList.map((character, idx) => {
          const isMyCharacter = character.ID === myCharacterInfo?.ID;
          const isOwner = character.ID === characterStore.owner;
          return (
            <li
              key={`nickname${character.ID}`}
              className={`${isMyCharacter ? 'text-red-500' : ''}`}
            >
              {character.nickname}
              {isMyCharacter && '(내아이디)'}
              {isOwner && '- 방장'}
            </li>
          );
        })}
      </ul>
    </>
  ));
};

export default RoomInfo;
