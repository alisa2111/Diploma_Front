import {call, put, takeLatest} from "redux-saga/effects";
import {IExpense, IReduxAction} from "../../models";
import config from "../../config";
import {setExpensesToStoreAction} from "./actions";
import {showError} from "../general/sagas";

// watcher + worker

export function* addExpenseSagaWatcher() {
    yield takeLatest('ADD_EXPENSE', addExpenseSagaWorker)
}

function* addExpenseSagaWorker(action: IReduxAction) {
    const newExpenses = yield call(addExpense, action.payload);
    yield put(setExpensesToStoreAction(newExpenses));
}

export function* getExpensesSagaWatcher() {
    yield takeLatest('GET_EXPENSES', getExpensesSagaWorker)
}

function* getExpensesSagaWorker(action: IReduxAction) {
    const expenses = yield call(getExpenses, action.payload);
    yield put(setExpensesToStoreAction(expenses));
}

const addExpense = (expense: IExpense) =>
    fetch(config.urls.ADD_EXPENSE, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({expense})
    })
        .then((res: any) => res.json())
        .catch((err: any) => showError("Ошибка обновления расхода!", err));

const getExpenses = (accountId: string) =>
    fetch(`${config.urls.GET_EXPENSES}/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => res.json())
        .then(res => res)
        .catch((err: any) => showError("Ошибка получения состояния расходов!", err));


