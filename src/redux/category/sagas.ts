import {call, put, takeLatest} from "redux-saga/effects";
import {ICategory, IReduxAction} from "../../models";
import {checkResponse} from "../general/sagas";
import config from "../../config";
import {setCategoriesToStore} from "./actions";
import {setSnackbarToStateAction, snackbarErrorNotification} from "../general/actions";

export function* getCategoriesSagaWatcher() {
    yield takeLatest('GET_CATEGORIES', getCategoriesSagaWorker)
}

export function* createCategorySagaWatcher() {
    yield takeLatest('CREATE_CATEGORY', createCategorySagaWorker)
}

export function* updateCategorySagaWatcher() {
    yield takeLatest('UPDATE_CATEGORY', updateCategorySagaWorker)
}

export function* deleteCategorySagaWatcher() {
    yield takeLatest('DELETE_CATEGORY', deleteCategorySagaWorker)
}

function* getCategoriesSagaWorker(action: IReduxAction) {
    try {
        const categories = yield call(getCategories, action.payload);
        yield put(setCategoriesToStore(categories));
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


function* createCategorySagaWorker(action: IReduxAction) {
    try {
        const categories = yield call(createCategory, action.payload);
        yield put(setCategoriesToStore(categories));
        yield put(setSnackbarToStateAction("Категория создана!", 'success'))
    } catch (e) {
        yield put(snackbarErrorNotification(e.message));
    }
}

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


function* updateCategorySagaWorker(action: IReduxAction) {
    try {
        const categories = yield call(updateCategory, action.payload);
        yield put(setCategoriesToStore(categories));
        yield put(setSnackbarToStateAction("Категория обновлена!", 'success'))
    } catch (e) {
        yield put(snackbarErrorNotification(e.message));
    }
}

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


function* deleteCategorySagaWorker(action: IReduxAction) {
    try {
        const categories = yield call(deleteCategory, action.payload);
        yield put(setCategoriesToStore(categories));
        yield put(setSnackbarToStateAction("Категория удалена!", 'success'))
    } catch (e) {
        yield put(snackbarErrorNotification(e.message));
    }
}

const deleteCategory = (categoryId: string) =>
    fetch(`${config.urls.CATEGORIES}/${categoryId}`, {
        method: 'delete'
    })
        .then((res: any) => checkResponse(res, 'Ошибка удаления категории!'))
        .then((res: any) => res.json());