import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers'

// persists the favorites state in local storage using redux-persist
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['favorites']
}

const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(pReducer);
export const persistor = persistStore(store);