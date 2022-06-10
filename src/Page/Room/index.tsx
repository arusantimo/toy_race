import CreateRoom from '@/page/Room/Create';
import CreatedRoom from '@/page/Room/Created';
import useStores from '@/hook/injectStore';
import { useObserver } from 'mobx-react';

const RoomPage = () => {
  const { roomStore } = useStores();
  return useObserver(() => {
    return (
      <main>
        <h2>게임방</h2>
        {roomStore.createdID === '' ? <CreateRoom /> : <CreatedRoom />}
      </main>
    );
  });
};

export default RoomPage;
