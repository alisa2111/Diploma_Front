export const setSnackbarToStateAction = (message: string, type?: string) => ({
    type: 'SET_SNACKBAR_TO_STATE',
    payload: {message, type}
});

export const snackbarErrorNotification = (message: string) => ({
    type: 'SET_SNACKBAR_TO_STATE',
    payload: {message, type: "error"}
});

export const removeSnackBarAction = () => ({
    type: 'REMOVE_SNACKBAR'
});