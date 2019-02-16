import {call, put, takeLatest} from "redux-saga/effects";
import {IExpense, IReduxAction} from "../../models";
import config from "../../config";
import {setExpensesToStoreAction} from "./actions";

export function* updateExpensesSagaWatcher() {
    yield takeLatest('UPDATE_EXPENSES', updateExpensesSagaWorker)
}

function* updateExpensesSagaWorker(action: IReduxAction) {
    const newExpenses = yield call(updateExpenses, action.payload);
    yield put(setExpensesToStoreAction(newExpenses));
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
        .catch((err: any) => alert("Account creation error!")); // [TODO: return err?]
