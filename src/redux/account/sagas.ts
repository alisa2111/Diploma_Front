import { call, put, takeLatest } from 'redux-saga/effects';
import {IReduxAction} from "../../models";
import {setAccountToStore} from "./actions";
import config from "../../config";
import {setSnackbarToStateAction, snackbarErrorNotification} from "../general/actions";

export function* createAccountSagaWatcher(getState: () => any) {
    yield takeLatest('ACCOUNTS', createAccountSagaWorker, getState)
}

function* createAccountSagaWorker(getState: () => any, action: IReduxAction) {
    try {
        const account = yield call(createAccount, action.payload);

        // update current user data in local storage
        getState().user.accounts.push({id: account.id, name: account.name});
        localStorage.setItem("user", JSON.stringify(getState().user));

        yield put(setAccountToStore(account));
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
        yield put(setAccountToStore(account));
    } catch (err) {
        yield put(snackbarErrorNotification("Ошибка при получении данных со счета!"));
    }
}

const createAccount = (args: {userId: string, accountName: string}) =>
    fetch(config.urls.ACCOUNTS, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({ owner: args.userId, name: args.accountName })
    })
        .then((res: any) => res.json());


const getAccountInfo = (accountId: string) =>
    fetch(`${config.urls.ACCOUNTS}/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => res.json());