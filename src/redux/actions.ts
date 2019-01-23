import {IUser} from "../models";

// auth
export const signInAction = (user: Partial<IUser>) => ({
    type: 'SIGN_IN',
    payload: {user},
});

export const signUpAction = (user: Partial<IUser>) => ({
    type: 'SIGN_UP',
    payload: user,
});

export const setUserToStoreAction = (user: Partial<IUser>) => ({
    type: 'SET_USER_TO_STORE',
    payload: user,
});