import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
const history = createBrowserHistory();
let store;

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers(history));

export const buildStore = initialState => {
    const storeInstance = createStore(
        persistedReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware,
                promiseMiddleware,
            )
        )
    );
    
    const persistorInstance = persistStore(storeInstance);

    return {
        storeInstance,
        persistorInstance
    };
}

export const getStore = () => {
    return store;
};

export const getHistory = () => {
    return history;
};
