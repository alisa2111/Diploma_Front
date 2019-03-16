import {ICategory} from "../../models";

export const createCategory = (category: ICategory) => ({
    type: 'CREATE_CATEGORY',
    payload: category
});

export const updateCategory = (category: ICategory) => ({
    type: 'UPDATE_CATEGORY',
    payload: category
});

export const checkCategory = (categoryId: string) => ({
    type: 'CHECK_CATEGORY',
    payload: categoryId
});

export const setCheckResultToStore = (result: boolean) => ({
    type: 'SET_CHECK_RESULT_TO_STORE',
    payload: result
});

export const deleteCategory = (categoryId: string, replaceTo: string | null) => ({
    type: 'DELETE_CATEGORY',
    payload: {categoryId, replaceTo}
});

export const getCategories = (accountId: string) => ({
    type: 'GET_CATEGORIES',
    payload: accountId
});

export const setCategoriesToStore = (categories: ICategory[]) => ({
    type: 'SET_CATEGORIES_TO_STORE',
    payload: categories
});