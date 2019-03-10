import {put} from 'redux-saga/effects';
import {snackbarErrorNotification} from "./actions";

export function checkResponse(res: any, errorMessage?: string) {
    if (res.ok) {
        return res;
    }
    throw new Error(errorMessage);
}

export function* showError(message: string, error?: any) {
    console.log("error:", error);
    yield put(snackbarErrorNotification(message));
}