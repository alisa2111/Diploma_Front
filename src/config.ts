// app urls
const BACKEND_URL = `http://localhost:9000`;

export default  {
    appRouterLinks: {
        HOME: "/",
        SIGN_UP: "/sign-up",
        ACCOUNT: "/account",
        HISTORY: "/account/history",
        CATEGORY: "/account/category",
        SOURCE: "/account/source",
        SETTINGS: "/account/settings",
    },
    urls: {
        AUTH: `${BACKEND_URL}/auth`,
        SIGN_UP: `${BACKEND_URL}/users`,
        ACCOUNTS: `${BACKEND_URL}/accounts`,
        GET_ACCOUNT_USERS: `${BACKEND_URL}/accounts/get-users`,
        SEND_INVITE: `${BACKEND_URL}/accounts/invite`,
        ADD_EXPENSE: `${BACKEND_URL}/money-flow/expenses`,
        ADD_INCOME: `${BACKEND_URL}/money-flow/income`,
        GET_SUMMARY_EXPENSES: `${BACKEND_URL}/money-flow/expenses/summary`,
        GET_INCOMES: `${BACKEND_URL}/money-flow/income`,
        SOURCES: `${BACKEND_URL}/sources`,
        SOURCES_ALL: `${BACKEND_URL}/sources/all`,
        CHECK_SOURCE: `${BACKEND_URL}/sources/check`,
        DELETE_SOURCE: `${BACKEND_URL}/sources/delete`,
        CATEGORIES: `${BACKEND_URL}/categories`,
        CATEGORIES_ALL: `${BACKEND_URL}/categories/all`,
        CHECK_CATEGORY: `${BACKEND_URL}/categories/check`,
        DELETE_CATEGORY: `${BACKEND_URL}/categories/delete`,
        GET_ALL_MONEY_FLOWS: `${BACKEND_URL}/money-flow`,
    }
}