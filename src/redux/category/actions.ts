import {ICategory} from "../../models";

export const getCategories = (accountId: string) => ({
    type: 'GET_CATEGORIES',
    payload: accountId
});

export const setCategoriesToStore = (categories: ICategory[]) => ({
    type: 'SET_CATEGORIES_TO_STORE',
    payload: categories
});