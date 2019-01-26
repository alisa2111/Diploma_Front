export interface IUser {
    email: string;
    password: string;
    name: string;
}

export interface IStore {
    user: Partial<IUser>
}

export interface IReduxAction {
    type: string;
    payload: any;
}