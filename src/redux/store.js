

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilise localStorage pour persister les données
import postsReducer from './reducers/postsReducer';
import authReducer from './reducers/authReducer';
// Configuration de redux-persist pour persister seulement le reducer `auth`
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Ne persiste que l'état `auth`
};

// Combiner les reducers
const rootReducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
    
});

// Appliquer redux-persist au rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Créer le store avec redux-persist et redux-thunk
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Créer le persistor pour permettre de rétablir le store à partir du stockage local
const persistor = persistStore(store);

export { store, persistor };
