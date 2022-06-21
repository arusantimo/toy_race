import type { listItemType } from '@/type/roomState';
import { observer } from 'mobx-react';

const ListItem = observer(({ name }: listItemType) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
});

export default ListItem;
