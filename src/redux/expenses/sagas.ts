import {call, put, takeLatest} from "redux-saga/effects";
import {IExpense, IReduxAction} from "../../models";
import config from "../../config";
import {setExpensesToStoreAction} from "./actions";
import {showError} from "../general/sagas";

export function* updateExpensesSagaWatcher() {
    yield takeLatest('UPDATE_EXPENSES', updateExpensesSagaWorker)
}

function* updateExpensesSagaWorker(action: IReduxAction) {
    const newExpenses = yield call(updateExpenses, action.payload);
    yield put(setExpensesToStoreAction(newExpenses));
}

export function* getExpensesSagaWatcher() {
    yield takeLatest('GET_EXPENSES', getExpensesSagaWorker)
}

function* getExpensesSagaWorker(action: IReduxAction) {
    const expenses = yield call(getExpenses, action.payload);
    yield put(setExpensesToStoreAction(expenses));
}

const updateExpenses = (expense: IExpense) =>
    fetch(config.urls.UPDATE_EXPENSES, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({expense})
    })
        .then((res: any) => res.json())
        .catch((err: any) => showError("Ошибка обновления расхода!", err));

const getExpenses = (accountId: string) =>
    fetch(`${config.urls.EXPENSES}/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => res.json())
        .then(res => res)
        .catch((err: any) => showError("Ошибка получения состояния расходов!", err));


