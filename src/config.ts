// app urls
const BACKEND_URL = `http://localhost:9000`;

export default  {
    appRouterLinks: {
        SIGN_UP: "/sign-up",
        ACCOUNT: "/account",
    },
    urls: {
        AUTH: `${BACKEND_URL}/auth`,
        SIGN_UP: `${BACKEND_URL}/users`,
        CREATE_ACCOUNT: `${BACKEND_URL}/accounts`,
        ADD_EXPENSE: `${BACKEND_URL}/money-flow/expenses/add`,
        GET_EXPENSES: `${BACKEND_URL}/money-flow/expenses`,
        GET_INCOMES: `${BACKEND_URL}/money-flow/income`,
        GET_SOURCES: `${BACKEND_URL}/sources`
    }
}