import {call, put, takeLatest} from "redux-saga/effects";
import {ICategory, IReduxAction} from "../../models";
import {checkResponse} from "../general/sagas";
import config from "../../config";
import {setCategoriesToStore, setCheckResultToStore} from "./actions";
import {setSnackbarToStateAction, snackbarErrorNotification} from "../general/actions";

type HelperParams = {
    action: (...args: any[]) => any,
    successMsg?: string
};

export function* watchCategoryCRUDAction() {
    yield takeLatest('GET_CATEGORIES', categoryWorker, {action: getCategories});
    yield takeLatest('CREATE_CATEGORY', categoryWorker, {action: createCategory, successMsg: 'Категория создана!'});
    yield takeLatest('UPDATE_CATEGORY', categoryWorker, {action: updateCategory, successMsg: 'Категория обновлена!'});
    yield takeLatest('DELETE_CATEGORY', categoryWorker, {action: deleteCategory, successMsg: 'Категория удалена!'});
}

export function* watchCheckCategoryAction() {
    yield takeLatest('CHECK_CATEGORY', checkCategoryWorker);
}

function* categoryWorker(params: HelperParams, action: IReduxAction) {
    try {
        const categories = yield call(params.action, action.payload);
        yield put(setCategoriesToStore(categories));
        if (params.successMsg) {
            yield put(setSnackbarToStateAction(params.successMsg, 'success'));
        }
    } catch (e) {
        yield put(snackbarErrorNotification(e.message));
    }
}

function* checkCategoryWorker(action: IReduxAction) {
    try {
        const result = yield call(checkCategory, action.payload);
        yield put(setCheckResultToStore(result.connected));
    } catch (e) {
        yield put(snackbarErrorNotification(e.message));
    }
}

const getCategories = (accountId: string) =>
    fetch(`${config.urls.CATEGORIES}/${accountId}`, {
        method: 'get',
    })
        .then((res: any) => checkResponse(res, 'Ошибка получения категорий!'))
        .then((res: any) => res.json());

const createCategory = (category: ICategory) =>
    fetch(`${config.urls.CATEGORIES}`, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({category})
    })
        .then((res: any) => checkResponse(res, 'Ошибка создания категории!'))
        .then((res: any) => res.json());

const updateCategory = (category: ICategory) =>
    fetch(`${config.urls.CATEGORIES}/${category.id}`, {
        method: 'put',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({category})
    })
        .then((res: any) => checkResponse(res, 'Ошибка обновленя категории!'))
        .then((res: any) => res.json());

const checkCategory = (categoryId: string) =>
    fetch(`${config.urls.CHECK_CATEGORY}/${categoryId}`, {
        method: 'get',
    })
        .then((res: any) => checkResponse(res))
        .then((res: any) => res.json());

const deleteCategory = (payload: any) =>
    fetch(`${config.urls.DELETE_CATEGORY}/${payload.categoryId}`, {
        method: 'post',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify({replaceTo: payload.replaceTo})
    })
        .then((res: any) => checkResponse(res, 'Ошибка удаления категории!'))
        .then((res: any) => res.json());