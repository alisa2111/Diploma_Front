import { call, put, takeLatest } from 'redux-saga/effects';
import {IReduxAction, IUser} from "../../models";
import {setUserToStoreAction, signInFailed} from "./actions";
import config from "../../config";
import {setSnackbarToStateAction} from "../general/actions";
import {showError} from "../general/sagas";

// when "SIGN_IN" action -> run signInSagaWorker
export function* signInSagaWatcher() {
    yield takeLatest('SIGN_IN', signInSagaWorker);
}

// Worker saga call function with side effects
// res: {token, user}
function* signInSagaWorker(action: IReduxAction) {
    const res = yield call(signIn, action.payload.user);
    if (res && res.user) {
        yield put(setUserToStoreAction(res.user));
        yield put(setSnackbarToStateAction("Вы успешно вошли", 'success'));
    } else {
        yield put(signInFailed());
    }
}

export function* signUpSagaWatcher() {
    yield takeLatest('SIGN_UP', signUpSagaWorker)
}

function* signUpSagaWorker(action: IReduxAction) {
    const user = yield call(signUp, action.payload.user);
    if (user) {
        yield put(setUserToStoreAction(user));
        yield put(setSnackbarToStateAction('Добро пожаловать!'));
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
        .then((res: any) => {
            if (res.ok) {
                return res.json();
            }
            return null;
        })
        .catch((err: any) => showError("Ошибка авторизации. Попробуйте позже.", err));

const signUp = (user: IUser) =>
    fetch(config.urls.SIGN_UP, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({ user })
    })
        .then((res: any) => res.json())
        .catch((err: any) => showError("Ошибка регистрации. Попробуйте позже.", err));