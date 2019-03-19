import {IUser} from "../../models";

export const signInAction = (user: Partial<IUser>) => ({
    type: 'SIGN_IN',
    payload: {user},
});

export const signInFailed = () => ({
    type: 'SIGN_IN_FAILED'
});

export const signUpAction = (user: Partial<IUser>) => ({
    type: 'SIGN_UP',
    payload: {user},
});

export const setUserToStoreAction = (user: Partial<IUser> | null) => ({
    type: 'SET_USER_TO_STORE',
    payload: user,
});

