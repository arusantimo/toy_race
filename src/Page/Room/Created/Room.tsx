import useStores from '@/hook/injectStore';
import Exit from '@/page/Room/Created/component/Exit';
import RoomInfo from '@/page/Room/Created/component/RoomInfo';
import PlayButton from '@/page/Room/Created/component/PlayButton';

const CreatedRoom = () => {
  const { listStore, roomStore, characterStore } = useStores();
  const roomInfo = listStore.list.get(roomStore.createdID);

  return roomInfo ? (
    <main>
      <Exit />
      <RoomInfo />
      {characterStore.characters.size > 2 && <PlayButton />}
    </main>
  ) : (
    <main />
  );
};

export default CreatedRoom;
