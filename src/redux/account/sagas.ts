import { call, put, takeLatest } from 'redux-saga/effects';
import {IReduxAction} from "../../models";
import {setAccountToStore, setAccountUsersToStore} from "./actions";
import config from "../../config";
import {setSnackbarToStateAction, snackbarErrorNotification} from "../general/actions";

export function* createAccountSagaWatcher(getState: () => any) {
    yield takeLatest('ACCOUNTS', createAccountSagaWorker, getState)
}

function* createAccountSagaWorker(getState: () => any, action: IReduxAction) {
    try {
        yield put(setAccountToStore(null));
        const account = yield call(createAccount, action.payload);

        // update current user data in local storage
        getState().user.accounts.push({id: account.id, name: account.name});
        localStorage.setItem("user", JSON.stringify(getState().user));
        localStorage.setItem('accountId', JSON.stringify(account.id));

        yield put(setAccountToStore(account));
        yield put(setSnackbarToStateAction('Счёт создан', 'success'));
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

export function* sendInviteSagaWatcher() {
    yield takeLatest('SEND_INVITE', sendInviteSagaWorker)
}

function* sendInviteSagaWorker(action: IReduxAction) {
    try {
        const inviteResult = yield call(sendInvite, action.payload);
        if (inviteResult.result === 'ok') {
            yield put(setSnackbarToStateAction("Приглашение отправлено!", "success"));
        }
    } catch (err) {
        yield put(snackbarErrorNotification("Ошибка отправки приглашения!"));
    }
}

export function* getAccountUsersSagaWatcher() {
    yield takeLatest('GET_ACCOUNT_USERS', getAccountUsersSagaWorker)
}

function* getAccountUsersSagaWorker(action: IReduxAction) {
    try {
        const users = yield call(getUsers, action.payload);
        yield put(setAccountUsersToStore(users));
    } catch (err) {
        yield put(snackbarErrorNotification("Ошибка получения пользователей!"));
    }
}

const getUsers = (accountId: string) =>
    fetch(`${config.urls.GET_ACCOUNT_USERS}/${accountId}`, {
       method: 'get'
    })
        .then((res: any) => res.json());

const sendInvite = (args: {email: string, accountId: string}) =>
    fetch(config.urls.SEND_INVITE, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({ email: args.email, accountId: args.accountId })
    })
        .then((res: any) => res.json());

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