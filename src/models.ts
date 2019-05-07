export interface IAttachedAccount {
    id: string;
    name: string;
}

export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    picture: string;
    accounts: IAttachedAccount[];
}

export interface ISource {
    id: string;
    accountId: string;
    balance: number;
    type: string; // cash || card
    title: string;
}

export interface IMoneyFlow {
    accountId: string;
    type: string; // "income" | "expense"
    amount: number;
    comment?: string;
    categoryId?: string;
    sourceId: string;
    date: string;
}

export interface IExpense extends IMoneyFlow {
    type: "expense"
}

export interface IIncome extends IMoneyFlow {
    type: "income"
}

export interface IAccount {
    id: string;
    name: string;
    owner: string; // user's ObjectId
}

export interface ISnackbar {
    isOpen: boolean;
    message: string;
    type?: string;
}

export interface IStore {
    signInFailed: boolean;
    user: Partial<IUser>;
    users: IUser[]; // account's users
    account: Partial<IAccount>;
    snackbar: ISnackbar;
    summaryExpenses: ISummaryExpense[];
    sources: ISource[];
    sourceConnected: boolean;
    categories: ICategory[];
    categoryConnected: boolean
    moneyFlows: ITableMoneyFlow[];
}

export interface IReduxAction {
    type: string;
    payload: any;
}

// for pie chart
export interface ISummaryExpense {
    categoryId: string
    totalAmount: number
    title: string
    color: string
    iconKey: string
}

export interface ICategory {
    id: string
    accountId: string
    title: string
    color: string
    iconKey: string
}

export interface ITableMoneyFlow {
    type: string;
    category: ICategory[];
    source: ISource[];
    amount: number;
    comment: string;
    date: Date;
}