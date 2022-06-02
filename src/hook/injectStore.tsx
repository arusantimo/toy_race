import React from 'react';
import listStore from '@/model/list/store';

export const storesContext = React.createContext({
  listStore,
});
export const useStores = () => React.useContext(storesContext);

export default useStores;
