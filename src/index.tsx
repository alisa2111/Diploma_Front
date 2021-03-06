import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import rootSaga from "./redux/rootSaga";
import reducer from "./redux/reducer";
import "../src/styles/account.css";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga, store.getState);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'),
);