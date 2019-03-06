import {call, put, takeLatest} from "redux-saga/effects";
import {IReduxAction} from "../../models";
import {setSourcesToStore} from "./actions";
import {showError} from "../general/sagas";
import config from "../../config";

export function* getSourcesSagaWatcher() {
    yield takeLatest('GET_SOURCES', getSourcesSagaWorker)
}

function* getSourcesSagaWorker(action: IReduxAction) {
    const sources = yield call(getSources, action.payload);
    yield put(setSourcesToStore(sources));
}

const getSources = (accountId: string) =>
    fetch(`${config.urls.GET_SOURCES}/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => res.json())
        .then(res => res)
        .catch((err: any) => showError("Ошибка получения состояния расходов!", err));
