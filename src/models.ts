export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    accounts: string[]; // accounts id
}

export interface ISource {
    id: string;
    balance: number;
    type: string; // cash || card
    comment?: string;
    title: string;
}

export interface IMoneyFlow {
    accountId: string;
    type: string; // "income" | "expense"
    amount: number;
    comment?: string;
    categoryId?: string;
    sourceId: string;
}

export interface IExpense extends IMoneyFlow {
    type: "expense"
}

export interface IIncome extends IMoneyFlow {
    type: "income"
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
    summaryExpenses: ISummaryExpense[]
    sources: ISource[]
    categories: ICategory[]
    moneyFlows: IMoneyFlow[]
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

export interface ITableRow {
    type: string
    category: ICategory[]
    source: ISource[]
    amount: number
    comment: string
    createdAt: Date
}