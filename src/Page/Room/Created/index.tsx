import useStores from '@/hook/injectStore';
import { useObserver } from 'mobx-react';
import CreateNick from '@/page/Room/Created/component/CreateNick';
import Room from '@/page/Room/Created/Room';

const CreatedRoom = () => {
  const { characterStore } = useStores();

  return useObserver(() => {
    return characterStore.characters.size > 0 ? <Room /> : <CreateNick />;
  });
};

export default CreatedRoom;
