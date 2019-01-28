import { call, put, takeLatest, all } from 'redux-saga/effects';
import {IReduxAction, IUser} from "../models";
import {setAccountToStoreAction, setUserToStoreAction} from "./actions";
import config from "../config";

// [TODO] Move account logic to another file

// declare watchers
export default function* rootSaga() {
    yield all([
        signInSagaWatcher(),
        signUpSagaWatcher(),

        createAccountSagaWatcher(),
    ]);
}

// when "SIGN_IN" action -> run signInSagaWorker
function* signInSagaWatcher() {
    yield takeLatest('SIGN_IN', signInSagaWorker)
}

// Worker saga call function with side effects
// res: {token, user}
function* signInSagaWorker(action: IReduxAction) {
    const res = yield call(signIn, action.payload.user);
    if (res.user) {
        yield put(setUserToStoreAction(res.user))
    }
}

function* signUpSagaWatcher() {
    yield takeLatest('SIGN_UP', signUpSagaWorker)
}

function* signUpSagaWorker(action: IReduxAction) {
    const user = yield call(signUp, action.payload.user);
    if (user) {
        yield put(setUserToStoreAction(user));
    }
}

function* createAccountSagaWatcher() {
    yield takeLatest('CREATE_ACCOUNT', createAccountSagaWorker)
}

function* createAccountSagaWorker(action: IReduxAction) {
    const account = yield call(createAccount, action.payload);
    yield put(setAccountToStoreAction(account));
}


// functions with side effect
const signIn = (user: Partial<IUser>) =>
    fetch(config.urls.AUTH, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
            'Authorization': `Basic ${window.btoa(`${user.email}:${user.password}`)}`,
        },
    })
        .then((res: any) => res.json())
        .catch((err: any) => alert("Auth error!"));

const signUp = (user: IUser) =>
    fetch(config.urls.SIGN_UP, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({ user })
    })
        .then((res: any) => res.json())
        .catch((err: any) => alert("Sign up error!"));

const createAccount = (userId: string) =>
    fetch(config.urls.CREATE_ACCOUNT, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({ owner: userId })
    })
        .then((res: any) => res.json())
        .catch((err: any) => alert("Account creation error!"));