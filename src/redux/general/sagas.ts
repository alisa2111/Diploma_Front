import {put} from 'redux-saga/effects';
import {snackbarErrorNotification} from "./actions";

export function* showError(message: string, error: any) {
    console.log("error:", error);
    yield put(snackbarErrorNotification(message));
}