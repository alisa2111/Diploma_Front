import {all} from "redux-saga/effects";
import {signInSagaWatcher, signUpSagaWatcher} from "./auth/sagas";
import {
    createAccountSagaWatcher, getAccountInfoSagaWatcher, getAccountUsersSagaWatcher,
    sendInviteSagaWatcher
} from "./account/sagas";
import {
    getSummaryExpensesSagaWatcher, addMoneyFlowSagaWatcher, getAllMoneyFlowsSagaWatcher,
    filterSagaWatcher
} from "./moneyFlow/sagas";
import {watchCheckSourceAction, watchSourceCRUDAction} from "./sources/sagas";
import {watchCategoryCRUDAction, watchCheckCategoryAction} from "./category/sagas";

export type HelperParams = {
    action: (...args: any[]) => any,
    successMsg?: string
};

export default function* rootSaga(getState: () => any) {
    yield all([
        signInSagaWatcher(),
        signUpSagaWatcher(),

        createAccountSagaWatcher(getState),
        getAccountInfoSagaWatcher(),
        sendInviteSagaWatcher(),
        getAccountUsersSagaWatcher(),

        addMoneyFlowSagaWatcher(),
        getSummaryExpensesSagaWatcher(),

        watchSourceCRUDAction(),
        watchCheckSourceAction(),

        watchCategoryCRUDAction(),
        watchCheckCategoryAction(),

        getAllMoneyFlowsSagaWatcher(getState),
        filterSagaWatcher(getState)
    ]);
}