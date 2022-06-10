import useStore from '@/hook/injectStore';
import ItemList from '@/page/List/Item';
import { Link } from 'react-router-dom';

const ListPage = () => {
  const { listStore, roomStore } = useStore();
  return (
    <main>
      <p>현재 게임방 {listStore.list.size}개</p>
      <p>
        <Link
          to="/room"
          onClickCapture={() => {
            roomStore.setCreatedID('');
          }}
        >
          만들기
        </Link>
      </p>
      <ItemList />
    </main>
  );
};

export default ListPage;
