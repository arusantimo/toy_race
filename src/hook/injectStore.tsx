import React from 'react';
import listStore from '@/model/list/store';
import roomStore from '@/model/room/store';
import authStore from '@/model/auth/store';
import characterStore from '@/model/Character/store';

export const storesContext = React.createContext({
  listStore,
  roomStore,
  authStore,
  characterStore,
});
export const useStores = () => React.useContext(storesContext);

export default useStores;
