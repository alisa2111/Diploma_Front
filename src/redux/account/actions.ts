import {IAccount} from "../../models";

export const createAccountAction = (userId: string) => ({
    type: 'CREATE_ACCOUNT',
    payload: userId
});

export const getAccountInfoAction = (accountId: string) => ({
    type: 'GET_ACCOUNT_INFO',
    payload: accountId,
});

export const setAccountToStoreAction = (account: IAccount) => ({
    type: 'SET_ACCOUNT_TO_STORE',
    payload: account,
});