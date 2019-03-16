import {call, put, takeLatest} from "redux-saga/effects";
import {IMoneyFlow, IReduxAction} from "../../models";
import config from "../../config";
import {setMoneyFlowsToStore, setSummaryExpensesToStore} from "./actions";
import {checkResponse, showError} from "../general/sagas";
import {getSources, setSourcesToStore} from "../sources/actions";
import {snackbarErrorNotification} from "../general/actions";
import _ from "lodash";
import * as moment from "moment";

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
    try {
        const expenses = yield call(getSummaryExpenses, action.payload);
        yield put(setSummaryExpensesToStore(expenses));
    } catch (err) {
        yield put(snackbarErrorNotification("Ошибка получения расходов!"));
    }
}


export function* getAllMoneyFlowsSagaWatcher() {
    yield takeLatest('GET_ALL_MONEY_FLOWS', getAllMoneyFlowsSagaWorker)
}

function* getAllMoneyFlowsSagaWorker(action: IReduxAction) {
    try {
        const moneyFlows = yield call(getAllMoneyFlows, action.payload);
        const tableData = _.map(moneyFlows, moneyFlow => ({
            type: moneyFlow.type === "expense" ? "Расход" : "Доход",
            categoryTitle: moneyFlow.category[0] ? moneyFlow.category[0].title : "-",
            sourceTitle: moneyFlow.source[0].title,
            amount: moneyFlow.amount,
            comment: moneyFlow.comment,
            createdAt: moment.utc(moneyFlow.createdAt).format("DD.MM.YYYY"),
        }));
        yield put(setMoneyFlowsToStore(tableData));
    } catch (err) {
        yield put(snackbarErrorNotification("Ошибка получения данных!"));
    }
}

const getAllMoneyFlows = (accountId: string) =>
    fetch(`${config.urls.GET_ALL_MONEY_FLOWS}/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => checkResponse(res))
        .then((res: any) => res.json())
        .then(res => res);

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
        .then(res => checkResponse(res))
        .then((res: any) => res.json())
        .then(res => res);


