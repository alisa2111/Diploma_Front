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
    const res = yield call(signIn, action.payload);
    if (res) {
        yield put(setUserToStoreAction(res));
        yield put(setSnackbarToStateAction("Вы успешно вошли", 'success'));
    } else {
        yield put(signInFailed());
    }
}

export function* signUpSagaWatcher() {
    yield takeLatest('SIGN_UP', signUpSagaWorker)
}

function* signUpSagaWorker(action: IReduxAction) {
    const user = yield call(signUp, action.payload);
    if (user) {
        yield put(setUserToStoreAction(user));
        yield put(setSnackbarToStateAction('Добро пожаловать!'));
    }
}

// functions with side effect
const signIn = (args: { user: Partial<IUser>, inviteId: string}) =>
    fetch(config.urls.AUTH, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
            'Authorization': `Basic ${window.btoa(`${args.user.email}:${args.user.password}`)}`,
        },
        body: JSON.stringify({inviteId: args.inviteId}),
    })
        .then((res: any) => {
            if (res.ok) {
                return res.json();
            }
            return null;
        })
        .catch((err: any) => showError("Ошибка авторизации. Попробуйте позже.", err));

const signUp = (args: {user: IUser, inviteId: string }) =>
    fetch(config.urls.SIGN_UP, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({ user: args.user, inviteId: args.inviteId })
    })
        .then((res: any) => res.json())
        .catch((err: any) => showError("Ошибка регистрации. Попробуйте позже.", err));