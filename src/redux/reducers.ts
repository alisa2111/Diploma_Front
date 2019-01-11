const reducer = (state = {}, action: any) => {
    switch (action.type) {
        case 'SET_USER_TO_STORE':
            return {user: action.payload};
        default:
            return state;
    }
};
export default reducer;