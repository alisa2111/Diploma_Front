import {IExpense} from "../../models";
import _ from "lodash";

export const fetchExpenses = (accountId: string) => ({
    type: 'GET_EXPENSES',
    payload: accountId
});

export const updateExpenses = (expense: IExpense, accountId: string) => ({
    type: 'UPDATE_EXPENSES',
    payload: _.assign(expense, {accountId})
});

export const setExpensesToStoreAction = (expenses: IExpense[]) => ({
    type: 'SET_EXPENSES_TO_STORE',
    payload: expenses,
});