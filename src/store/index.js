import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducers'

// persists the favorites state in local storage using redux-persist
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['favorites']
}

const pReducer = persistReducer(persistConfig, rootReducer)
                // change to pReducer
export const store = createStore(pReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);