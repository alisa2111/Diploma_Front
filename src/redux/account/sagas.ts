import { call, put, takeLatest } from 'redux-saga/effects';
import {IReduxAction} from "../../models";
import {setAccountToStoreAction} from "./actions";
import config from "../../config";
import {setSnackbarToStateAction, snackbarErrorNotification} from "../general/actions";

export function* createAccountSagaWatcher(getState: () => any) {
    yield takeLatest('CREATE_ACCOUNT', createAccountSagaWorker, getState)
}

function* createAccountSagaWorker(getState: () => any, action: IReduxAction) {
    try {
        const account = yield call(createAccount, action.payload);

        // update current user data in local storage
        getState().user.accounts.push(account.id);
        localStorage.setItem("user", JSON.stringify(getState().user));

        yield put(setAccountToStoreAction(account));
        yield put(setSnackbarToStateAction('Счёт создан'));
    } catch (err) {
        yield put(snackbarErrorNotification("Ошибка при создании счета!"));
    }
}

export function* getAccountInfoSagaWatcher() {
    yield takeLatest('GET_ACCOUNT_INFO', getAccountInfoSagaWorker)
}

function* getAccountInfoSagaWorker(action: IReduxAction) {
    try {
        const account = yield call(getAccountInfo, action.payload);
        yield put(setAccountToStoreAction(account));
    } catch (err) {
        yield put(snackbarErrorNotification("Ошибка при получении данных со счета!"));
    }
}


const createAccount = (userId: string) =>
    fetch(config.urls.CREATE_ACCOUNT, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({ owner: userId })
    })
        .then((res: any) => res.json());


const getAccountInfo = (accountId: string) =>
    fetch(`http://localhost:9000/accounts/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => res.json())
        .then(res => res);