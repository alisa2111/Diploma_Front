export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    accounts: string[]; // accounts id
}

export interface ISource {
    balance: number;
    type: string; // cash || card
    comment?: string;
    title: string;
}

export interface IExpense {
    key: string;
    value: number;
    accountId?: string;
    title?: string;
    comment?: string;
    color?: string;
}

export interface IIncome {
    key: string;
    value: number;
    accountId?: string;
    title?: string;
    comment?: string;
    currency?: string; // TODO not optional
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
    type?: string;
}

export interface IStore {
    signInFailed: boolean
    user: Partial<IUser>
    account: Partial<IAccount>
    snackbar: ISnackbar
    expenses: IExpense[]
    sources: ISource[]
}

export interface IReduxAction {
    type: string;
    payload: any;
}