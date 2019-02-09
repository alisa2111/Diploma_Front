import { call, put, takeLatest, all } from 'redux-saga/effects';
import {IReduxAction, IUser} from "../../models";
import {setUserToStoreAction} from "./actions";
import config from "../../config";

// when "SIGN_IN" action -> run signInSagaWorker
export function* signInSagaWatcher() {
    yield takeLatest('SIGN_IN', signInSagaWorker)
}

// Worker saga call function with side effects
// res: {token, user}
function* signInSagaWorker(action: IReduxAction) {
    const res = yield call(signIn, action.payload.user);
    // [TODO] if return err?
    if (res.user) {
        yield put(setUserToStoreAction(res.user))
    }
}

export function* signUpSagaWatcher() {
    yield takeLatest('SIGN_UP', signUpSagaWorker)
}

function* signUpSagaWorker(action: IReduxAction) {
    const user = yield call(signUp, action.payload.user);
    if (user) {
        yield put(setUserToStoreAction(user));
    }
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
        .catch((err: any) => err);

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
