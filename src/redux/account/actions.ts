import {IAccount, IUser} from "../../models";

export const createAccount = (userId: string, accountName: string) => ({
    type: 'ACCOUNTS',
    payload: {userId, accountName}
});

export const getAccountInfo = (accountId: string) => ({
    type: 'GET_ACCOUNT_INFO',
    payload: accountId,
});

export const setAccountToStore = (account: IAccount | null) => ({
    type: 'SET_ACCOUNT_TO_STORE',
    payload: account,
});

export const sendInvite = (email: string, accountId: string) => ({
    type: 'SEND_INVITE',
    payload: {email, accountId},
});

export const getAccountUsers = (accountId: string) => ({
    type: 'GET_ACCOUNT_USERS',
    payload: accountId,
});

export const setAccountUsersToStore = (users: IUser[]) => ({
    type: 'SET_ACCOUNT_USERS_TO_STORE',
    payload: users,
});