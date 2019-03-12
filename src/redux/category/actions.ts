import {ICategory} from "../../models";

export const createCategory = (category: ICategory) => ({
    type: 'CREATE_CATEGORY',
    payload: category
});

export const updateCategory = (category: ICategory) => ({
    type: 'UPDATE_CATEGORY',
    payload: category
});


export const deleteCategory = (categoryId: string) => ({
    type: 'DELETE_CATEGORY',
    payload: categoryId
});

export const getCategories = (accountId: string) => ({
    type: 'GET_CATEGORIES',
    payload: accountId
});

export const setCategoriesToStore = (categories: ICategory[]) => ({
    type: 'SET_CATEGORIES_TO_STORE',
    payload: categories
});