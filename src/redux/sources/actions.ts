import {ISource} from "../../models";

export const getSources = (accountId: string) => ({
    type: 'GET_SOURCES',
    payload: accountId
});

export const setSourcesToStore = (sources: ISource[]) => ({
    type: 'SET_SOURCES_TO_STORE',
    payload: sources,
});