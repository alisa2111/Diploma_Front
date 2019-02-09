import { call, put, takeLatest, all } from 'redux-saga/effects';
import {IReduxAction} from "../../models";
import {setAccountToStoreAction} from "./actions";
import config from "../../config";
import {updateUserAction} from "../auth/actions";


export function* createAccountSagaWatcher() {
    yield takeLatest('CREATE_ACCOUNT', createAccountSagaWorker)
}

function* createAccountSagaWorker(action: IReduxAction) {
    const userWithAccount = yield call(createAccount, action.payload);
    yield put(updateUserAction(userWithAccount));
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
        .catch((err: any) => alert("Account creation error!")); // [TODO: return err?]


const getAccountInfo = (accountId: string) =>
    fetch(`http://localhost:9000/accounts/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => res.json())
        .then(res => res)
        .catch((err: any) => alert("Account creation error!")); // [TODO: return err?]