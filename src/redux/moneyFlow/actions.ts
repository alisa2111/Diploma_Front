import {IExpense, IIncome, ISummaryExpense} from "../../models";

export const fetchSummaryExpenses = (accountId: string) => ({
    type: 'GET_SUMMARY_EXPENSES',
    payload: accountId
});

export const addExpense = (expense: IExpense) => ({
    type: 'ADD_EXPENSE',
    payload: expense
});

export const setSummaryExpensesToStore = (expenses: ISummaryExpense[]) => ({
    type: 'SET_SUMMARY_EXPENSES_TO_STORE',
    payload: expenses
});

export const addIncome = (income: IIncome) => ({
    type: "ADD_INCOME",
    payload: income
});