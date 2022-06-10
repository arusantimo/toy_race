import useStores from '@/hook/injectStore';
import { useObserver } from 'mobx-react';

const CreatedRoom = () => {
  const { listStore, roomStore } = useStores();
  const roomInfo = listStore.list.get(roomStore.createdID);

  return useObserver(() => {
    return roomInfo ? (
      <main>
        <h2>게임방 이름: {roomInfo.name}</h2>
        <button type="submit" onClick={roomStore.exit}>
          나가기
        </button>
        {roomInfo.password && <p>비밀번호: {roomInfo.password}</p>}
        <ul>
          <li />
        </ul>
      </main>
    ) : (
      <main />
    );
  });
};

export default CreatedRoom;
