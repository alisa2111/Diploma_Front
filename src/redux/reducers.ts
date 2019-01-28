const reducer = (store = {}, action: any) => {
    switch (action.type) {
        case 'SET_USER_TO_STORE':
            return {user: action.payload};
        case 'SET_ACCOUNT_TO_STORE':
            return {...store, account: action.payload};
        default:
            return store;
    }
};
export default reducer;