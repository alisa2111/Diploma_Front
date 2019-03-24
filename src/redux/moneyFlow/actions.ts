import {IMoneyFlow, ISummaryExpense, ITableMoneyFlow} from "../../models";
import {IFilterableFields} from "../../components/history/HistoryFilter";

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

export const getAllMoneyFlows = (accountId: string) => ({
    type: "GET_ALL_MONEY_FLOWS",
    payload: accountId,
});

export const setMoneyFlowsToStore = (moneyFlows: ITableMoneyFlow[]) => ({
    type: "SET_MONEY_FLOWS_TO_STORE",
    payload: moneyFlows
});

export const onFilterChange = (filterableFields: IFilterableFields) => ({
    type: "FILTER_CHANGE",
    payload: {filterableFields},
});