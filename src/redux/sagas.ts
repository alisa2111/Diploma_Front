import { call, put, takeLatest, all } from 'redux-saga/effects';
import {IUser} from "../models";
import {setUserToStoreAction} from "./actions";

// declare watchers
export default function* rootSaga() {
    yield all([
        signInSagaWatcher(),
        signUpSagaWatcher()
    ]);
}

// when "SIGN_IN" action -> run signInSagaWorker
function* signInSagaWatcher() {
    yield takeLatest('SIGN_IN', signInSagaWorker)
}

// Worker saga call function with side effects
// NO ANY
function* signInSagaWorker(action: any) {
    const user = yield call(signIn, action.payload.user);
    yield put(setUserToStoreAction(user))
}

function* signUpSagaWatcher() {
    yield takeLatest('SIGN_UP', signUpSagaWorker)
}

function* signUpSagaWorker(action: any) {
    const user = yield call(signUp, action.payload.user);
    yield put(setUserToStoreAction(user))
}

// function with side effect
const signIn = (user: Partial<IUser>) =>
    fetch("http://localhost:9000/auth", {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
            'Authorization': `Basic ${window.btoa(`${user.email}:${user.password}`)}`,
        },
    })
        .then((res: any) => res.json())
        .then((result:any) => {
            // localStorage.setItem('token' , result.token);
            return {
                email: result.user.email,
            };
        })
        .catch((err: any) => alert("Auth error!"));

const signUp = (user: IUser) =>
    fetch("http://localhost:9000/users", {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({ user })
    })
        .then((res: any) => res.json())
        .catch((err: any) => alert("Sign up error!"));

