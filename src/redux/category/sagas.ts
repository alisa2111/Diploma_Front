import {call, put, takeLatest} from "redux-saga/effects";
import {IReduxAction} from "../../models";
import {checkResponse} from "../general/sagas";
import config from "../../config";
import {setCategoriesToStore} from "./actions";
import {snackbarErrorNotification} from "../general/actions";

export function* getCategoriesSagaWatcher() {
    yield takeLatest('GET_CATEGORIES', getCategoriesSagaWorker)
}

function* getCategoriesSagaWorker(action: IReduxAction) {
    try {
        const categories = yield call(getSources, action.payload);
        yield put(setCategoriesToStore(categories));
    } catch (e) {
        yield put(snackbarErrorNotification(e.message));
    }
}

const getSources = (accountId: string) =>
    fetch(`${config.urls.GET_CATEGORIES}/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => checkResponse(res, 'Ошибка получения категорий'))
        .then((res: any) => res.json());