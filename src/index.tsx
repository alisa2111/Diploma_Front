import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from "./redux/reducers";
import rootSaga from "./redux/sagas";


const sagaMiddleware = createSagaMiddleware();

// import reducer!
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger),
);

// import rootSaga!
sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);