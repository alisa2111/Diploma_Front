import {IAccount} from "../../models";

export const createAccount = (userId: string, accountName: string) => ({
    type: 'ACCOUNTS',
    payload: {userId, accountName}
});

export const getAccountInfo = (accountId: string) => ({
    type: 'GET_ACCOUNT_INFO',
    payload: accountId,
});

export const setAccountToStore = (account: IAccount) => ({
    type: 'SET_ACCOUNT_TO_STORE',
    payload: account,
});