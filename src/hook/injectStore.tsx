import React from 'react';
import listStore from '@/model/list/store';
import roomStore from '@/model/room/store';
import authStore from '@/model/auth/store';

export const storesContext = React.createContext({
  listStore,
  roomStore,
  authStore,
});
export const useStores = () => React.useContext(storesContext);

export default useStores;
