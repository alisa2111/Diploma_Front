import {call, put, takeLatest} from "redux-saga/effects";
import {IReduxAction, ISource} from "../../models";
import {setSourceCheckResultToStore, setSourcesToStore} from "./actions";
import {checkResponse} from "../general/sagas";
import config from "../../config";
import {HelperParams} from "../rootSaga";
import {setSnackbarToStateAction, snackbarErrorNotification} from "../general/actions";

export function* watchSourceCRUDAction() {
    yield takeLatest('GET_SOURCES', sourceWorker, {action: getSources});
    yield takeLatest('CREATE_SOURCE', sourceWorker, {action: createSource, successMsg: 'Источник создан!'});
    yield takeLatest('UPDATE_SOURCE', sourceWorker, {action: updateSource, successMsg: 'Источник обновлен!'});
    yield takeLatest('DELETE_SOURCE', sourceWorker, {action: deleteSource, successMsg: 'Истончник удален!'});
}

export function* watchCheckSourceAction() {
    yield takeLatest('CHECK_SOURCE', checkSourceWorker);
}

function* sourceWorker(params: HelperParams, action: IReduxAction) {
    try {
        const sources = yield call(params.action, action.payload);
        yield put(setSourcesToStore(sources));
        if (params.successMsg) {
            yield put(setSnackbarToStateAction(params.successMsg, 'success'));
        }
    } catch (e) {
        yield put(snackbarErrorNotification(e.message));
    }
}

function* checkSourceWorker(action: IReduxAction) {
    try {
        const result = yield call(checkSource, action.payload);
        yield put(setSourceCheckResultToStore(result.connected));
    } catch (e) {
        yield put(snackbarErrorNotification(e.message));
    }
}

const getSources = (accountId: string) =>
    fetch(`${config.urls.SOURCES_ALL}/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => checkResponse(res, 'Ошибка получения источников!'))
        .then((res: any) => res.json());

const createSource = (source: ISource) =>
    fetch(`${config.urls.SOURCES}`, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({source})
    })
        .then((res: any) => checkResponse(res, 'Ошибка создания источника!'))
        .then((res: any) => res.json());

const updateSource = (source: ISource) =>
    fetch(`${config.urls.SOURCES}`, {
        method: 'put',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({source})
    })
        .then((res: any) => checkResponse(res, 'Ошибка обновления источника!'))
        .then((res: any) => res.json());

const checkSource = (sourceId: string) =>
    fetch(`${config.urls.CHECK_SOURCE}/${sourceId}`, {
        method: 'get',
    })
        .then((res: any) => checkResponse(res))
        .then((res: any) => res.json());

const deleteSource = (payload: any) =>
    fetch(`${config.urls.DELETE_SOURCE}/${payload.sourceId}`, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({replaceTo: payload.replaceTo})
    })
        .then((res: any) => checkResponse(res, 'Ошибка удаления источника!'))
        .then((res: any) => res.json());
