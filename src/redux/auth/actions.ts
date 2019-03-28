import {IUser} from "../../models";

export const signInAction = (user: Partial<IUser>, inviteId: string | null) => ({
    type: 'SIGN_IN',
    payload: {user, inviteId},
});

export const signInFailed = () => ({
    type: 'SIGN_IN_FAILED'
});

export const signUpAction = (user: Partial<IUser>, inviteId: string | null) => ({
    type: 'SIGN_UP',
    payload: {user, inviteId},
});

export const setUserToStoreAction = (user: Partial<IUser> | null) => ({
    type: 'SET_USER_TO_STORE',
    payload: user,
});

export const resetStore = () => ({
    type: 'RESET_STORE',
});

