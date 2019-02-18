import { call, put, takeLatest } from 'redux-saga/effects';
import {IReduxAction} from "../../models";
import {setAccountToStoreAction} from "./actions";
import config from "../../config";
import {updateUserAction} from "../auth/actions";
import {setSnackbarToStateAction} from "../general/actions";
import {showError} from "../general/sagas";


export function* createAccountSagaWatcher() {
    yield takeLatest('CREATE_ACCOUNT', createAccountSagaWorker)
}

function* createAccountSagaWorker(action: IReduxAction) {
    const userWithAccount = yield call(createAccount, action.payload);
    if (userWithAccount) {
        yield put(updateUserAction(userWithAccount));
        yield put(setSnackbarToStateAction('Счёт создан'));
    }
}


export function* getAccountInfoSagaWatcher() {
    yield takeLatest('GET_ACCOUNT_INFO', getAccountInfoSagaWorker)
}

function* getAccountInfoSagaWorker(action: IReduxAction) {
    const account = yield call(getAccountInfo, action.payload);
    yield put(setAccountToStoreAction(account));
}


const createAccount = (userId: string) =>
    fetch(config.urls.CREATE_ACCOUNT, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({ owner: userId })
    })
        .then((res: any) => res.json())
        .catch((err: any) => showError("Ошибка создания счета!", err));


const getAccountInfo = (accountId: string) =>
    fetch(`http://localhost:9000/accounts/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => res.json())
        .then(res => res)
        .catch((err: any) => showError("Ошибка получения данных счета!", err));