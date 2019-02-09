export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    accounts: string[]; // accounts id
}

export interface IAccount {
    id: string;
    balance: number;
    owner: string; // user's ObjectId
}

export interface IStore {
    user: Partial<IUser>
    account: Partial<IAccount>
}

export interface IReduxAction {
    type: string;
    payload: any;
}