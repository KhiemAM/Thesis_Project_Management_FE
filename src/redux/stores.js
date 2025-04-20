import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { activeCardReducer } from './activeCard/activeCardSlice'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer
})

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})