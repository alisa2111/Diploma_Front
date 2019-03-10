// app urls
const BACKEND_URL = `http://localhost:9000`;

export default  {
    appRouterLinks: {
        SIGN_UP: "/sign-up",
        ACCOUNT: "/account",
        HISTORY: "/account/history"
    },
    urls: {
        AUTH: `${BACKEND_URL}/auth`,
        SIGN_UP: `${BACKEND_URL}/users`,
        CREATE_ACCOUNT: `${BACKEND_URL}/accounts`,
        ADD_EXPENSE: `${BACKEND_URL}/money-flow/expenses`,
        ADD_INCOME: `${BACKEND_URL}/money-flow/income`,
        GET_SUMMARY_EXPENSES: `${BACKEND_URL}/money-flow/expenses/summary`,
        GET_INCOMES: `${BACKEND_URL}/money-flow/income`,
        GET_SOURCES: `${BACKEND_URL}/sources`,
        GET_ALL_MONEY_FLOWS: `${BACKEND_URL}/money-flow`
    }
}