import {IAccount, IUser} from "../models";

export const signInAction = (user: Partial<IUser>) => ({
    type: 'SIGN_IN',
    payload: {user},
});

export const signUpAction = (user: Partial<IUser>) => ({
    type: 'SIGN_UP',
    payload: {user},
});

export const setUserToStoreAction = (user: Partial<IUser> | null) => ({
    type: 'SET_USER_TO_STORE',
    payload: user,
});

// [TODO] Move account logic to another file
export const createAccountAction = (userId: string) => ({
    type: 'CREATE_ACCOUNT',
    payload: userId
});

export const setAccountToStoreAction = (account: IAccount) => ({
    type: 'SET_ACCOUNT_TO_STORE',
    payload: account,
});