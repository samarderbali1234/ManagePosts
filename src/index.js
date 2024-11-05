// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'; // Assurez-vous d'importer le Provider
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}> {/* Entourez votre application avec le Provider */}
        <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
        </React.StrictMode>
    </Provider>
);
