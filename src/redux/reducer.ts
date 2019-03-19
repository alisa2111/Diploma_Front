const reducer = (store = {}, {payload, type}: any) => {
    switch (type) {
        case 'SIGN_IN_FAILED':
            return {...store, signInFailed: true};
        case 'SET_USER_TO_STORE':
            return {...store, user: payload};
        case 'SET_ACCOUNT_TO_STORE':
            return {...store, account: payload};
        case 'SET_SNACKBAR_TO_STATE':
            return {...store, snackbar: {isOpen: true, message: payload.message, type: payload.type}};
        case 'REMOVE_SNACKBAR':
            return {...store, snackbar: null};
        case 'SET_SUMMARY_EXPENSES_TO_STORE':
            return {...store, summaryExpenses: payload};
        case 'SET_SOURCES_TO_STORE':
            return {...store, sources: payload};
        case 'SET_SOURCE_CHECK_RESULT_TO_STORE':
            return {...store, sourceConnected: payload};
        case 'SET_CATEGORIES_TO_STORE':
            return {...store, categories: payload};
        case 'SET_CATEGORY_CHECK_RESULT_TO_STORE':
            return {...store, categoryConnected: payload};
        case 'SET_MONEY_FLOWS_TO_STORE':
            return {...store, moneyFlows: payload};
        default:
            return store;
    }
};
export default reducer;