import {IMoneyFlow, ISummaryExpense} from "../../models";

export const fetchSummaryExpenses = (accountId: string) => ({
    type: 'GET_SUMMARY_EXPENSES',
    payload: accountId
});

export const setSummaryExpensesToStore = (expenses: ISummaryExpense[]) => ({
    type: 'SET_SUMMARY_EXPENSES_TO_STORE',
    payload: expenses
});

export const addMoneyFlow = (moneyFlow: IMoneyFlow) => ({
    type: "ADD_MONEY_FLOW",
    payload: moneyFlow
});