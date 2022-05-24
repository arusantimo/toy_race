import { useObserver } from 'mobx-react';
import ListItem from './component/Item';
import useStore from '@/hook/injectStore';

const ListPage = () => {
  console.log(12121212);
  const { listStore } = useStore();
  return useObserver(() => (
    <main>
      <p>{listStore.list.size}</p>
      {/* <div>게임방 리스트{ListStore.ssss.length}</div> */}
      {[...listStore.list.keys()].map((k) => {
        const d = listStore.list.get(k);
        return d && <ListItem {...d} />;
      })}
    </main>
  ));
};

export default ListPage;
