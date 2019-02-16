export const setSnackbarToStateAction = (message: string) => ({
    type: 'SET_SNACKBAR_TO_STATE',
    payload: message
});

export const removeSnackBarAction = () => ({
    type: 'REMOVE_SNACKBAR'
});