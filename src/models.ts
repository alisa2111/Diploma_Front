export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    accounts: string[]; // accounts id
}

interface IExpense {
    key: string;
    value: number;
    color: string;
}

export interface IAccount {
    id: string;
    balance: number;
    owner: string; // user's ObjectId
    expenses: IExpense[];
}

export interface ISnackbar {
    isOpen: boolean;
    message: string;
}

export interface IStore {
    user: Partial<IUser>
    account: Partial<IAccount>
    snackbar: ISnackbar
}

export interface IReduxAction {
    type: string;
    payload: any;
}