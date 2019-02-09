import {all} from "redux-saga/effects";
import {signInSagaWatcher, signUpSagaWatcher} from "./auth/sagas";
import {createAccountSagaWatcher, getAccountInfoSagaWatcher} from "./account/sagas";

export default function* rootSaga() {
    yield all([
        signInSagaWatcher(),
        signUpSagaWatcher(),

        createAccountSagaWatcher(),
        getAccountInfoSagaWatcher(),
    ]);
}