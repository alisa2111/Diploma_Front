import {all} from "redux-saga/effects";
import {signInSagaWatcher, signUpSagaWatcher} from "./auth/sagas";
import {createAccountSagaWatcher, getAccountInfoSagaWatcher} from "./account/sagas";
import {getSummaryExpensesSagaWatcher, addMoneyFlowSagaWatcher, getAllMoneyFlowsSagaWatcher} from "./moneyFlow/sagas";
import {getSourcesSagaWatcher} from "./sources/sagas";
import {watchCategoryCRUDAction, watchCheckCategoryAction} from "./category/sagas";

export default function* rootSaga() {
    yield all([
        signInSagaWatcher(),
        signUpSagaWatcher(),

        createAccountSagaWatcher(),
        getAccountInfoSagaWatcher(),

        addMoneyFlowSagaWatcher(),
        getSummaryExpensesSagaWatcher(),

        getSourcesSagaWatcher(),

        watchCategoryCRUDAction(),
        watchCheckCategoryAction(),

        getAllMoneyFlowsSagaWatcher(),
    ]);
}