const reducer = (store = {}, {payload, type}: any) => {
    switch (type) {
        case 'SET_USER_TO_STORE':
            return {user: payload};
        case 'UPDATE_USER':
            return {...store, user: payload};
        case 'SET_ACCOUNT_TO_STORE':
            return {...store, account: payload};
        default:
            return store;
    }
};
export default reducer;