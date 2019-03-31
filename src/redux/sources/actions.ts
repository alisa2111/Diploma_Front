import {ISource} from "../../models";

export const getSources = (accountId: string) => ({
    type: 'GET_SOURCES',
    payload: accountId
});

export const setSourcesToStore = (sources: ISource[]) => ({
    type: 'SET_SOURCES_TO_STORE',
    payload: sources,
});

export const createSource = (source: ISource) => ({
    type: 'CREATE_SOURCE',
    payload: source
});

export const updateSource = (source: ISource) => ({
    type: 'UPDATE_SOURCE',
    payload: source
});

export const checkSource = (sourceId: string) => ({
    type: 'CHECK_SOURCE',
    payload: sourceId
});

export const setSourceCheckResultToStore = (result: boolean | null) => ({
    type: 'SET_SOURCE_CHECK_RESULT_TO_STORE',
    payload: result
});

export const deleteSource = (sourceId: string, replaceTo: string | null) => ({
    type: 'DELETE_SOURCE',
    payload: {sourceId, replaceTo}
});