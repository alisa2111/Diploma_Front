import {all} from "redux-saga/effects";
import {signInSagaWatcher, signUpSagaWatcher} from "./auth/sagas";
import {createAccountSagaWatcher, getAccountInfoSagaWatcher} from "./account/sagas";
import {getExpensesSagaWatcher, addExpenseSagaWatcher} from "./expenses/sagas";
import {getSourcesSagaWatcher} from "./sources/sagas";

export default function* rootSaga() {
    yield all([
        signInSagaWatcher(),
        signUpSagaWatcher(),

        createAccountSagaWatcher(),
        getAccountInfoSagaWatcher(),

        addExpenseSagaWatcher(),
        getExpensesSagaWatcher(),

        getSourcesSagaWatcher(),
    ]);
}