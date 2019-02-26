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
        UPDATE_EXPENSES: `${BACKEND_URL}/money-flow/expenses/update`,
        EXPENSES: `${BACKEND_URL}/money-flow/expenses`
    }
}