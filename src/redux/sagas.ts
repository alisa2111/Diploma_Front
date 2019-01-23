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
        .then((res: any) => {
            return res.json();
        })
        .then((result:any) => {
            // localStorage.setItem('token' , result.token);
            return {
                email: result.user.email,
            };
        })
        .catch((err: any) => {
            console.log(err);
            alert("Error!");
        });

const signUp = (user: IUser) => {
    return {
        email: "mailbox@gmail.com",
        name: "Jessy"

    };
};
    /*fetch("http://localhost:9000/users", {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
            'Authorization': `Basic ${window.btoa(`${user.email}:${user.password}`)}`,
        },
    })
        .then((res: any) => {
            return res.json();
        })
        .then((result:any) => {
            // localStorage.setItem('token' , result.token);
            return {
                user: result.user,
            };
        })
        .catch((err: any) => {
            console.log(err);
            alert("Sign up error!");
        });*/