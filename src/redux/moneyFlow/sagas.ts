import {call, put, takeLatest} from "redux-saga/effects";
import {IMoneyFlow, IReduxAction} from "../../models";
import config from "../../config";
import {setSummaryExpensesToStore} from "./actions";
import {checkResponse, showError} from "../general/sagas";
import {getSources, setSourcesToStore} from "../sources/actions";
import {snackbarErrorNotification} from "../general/actions";

// watcher + worker

export function* addMoneyFlowSagaWatcher() {
    yield takeLatest('ADD_MONEY_FLOW', addMoneyFlowSagaWorker);
}

function* addMoneyFlowSagaWorker(action: IReduxAction) {
    try {
        if (action.payload.type === "expense") {
            const newExpenses = yield call(addExpense, action.payload);
            yield put(setSummaryExpensesToStore(newExpenses));
            yield put(getSources(action.payload.accountId));
        } else {
            const sources = yield call(addIncome, action.payload);
            yield put(setSourcesToStore(sources));
        }
    } catch (err) {
        yield put(snackbarErrorNotification("Ошибка добавления!"));
    }
}

export function* getSummaryExpensesSagaWatcher() {
    yield takeLatest('GET_SUMMARY_EXPENSES', getSummaryExpensesSagaWorker)
}

function* getSummaryExpensesSagaWorker(action: IReduxAction) {
    const expenses = yield call(getSummaryExpenses, action.payload);
    yield put(setSummaryExpensesToStore(expenses));
}

const addExpense = (expense: IMoneyFlow) =>
    fetch(config.urls.ADD_EXPENSE, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({expense})
    })
        .then((res: any) => checkResponse(res))
        .then((res: any) => res.json());

const addIncome = (income: IMoneyFlow) =>
    fetch(config.urls.ADD_INCOME, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({income})
    })
        .then((res: any) => checkResponse(res))
        .then((res: any) => res.json());

const getSummaryExpenses = (accountId: string) =>
    fetch(`${config.urls.GET_SUMMARY_EXPENSES}/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => res.json())
        .then(res => res)
        .catch((err: any) => showError("Ошибка получения состояния расходов!", err));


