import { useObserver } from 'mobx-react';
import useStore from '@/hook/injectStore';
import ListItem from './component/Item';

const ItemList = () => {
  const { listStore } = useStore();
  return useObserver(() => (
    <>
      {/* <div>게임방 리스트{ListStore.ssss.length}</div> */}
      {[...listStore.list.keys()].map((k) => {
        const d = listStore.list.get(k);
        return d && <ListItem key={k} {...d} />;
      })}
    </>
  ));
};

export default ItemList;
