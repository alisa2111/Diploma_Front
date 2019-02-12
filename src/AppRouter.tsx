import * as React from "react";
import {IAccount, IStore, IUser} from "./models";
import { BrowserRouter } from 'react-router-dom';
import {Redirect, Route, Switch} from "react-router";
import HomePage from "./components/HomePage";
import Auth from "./components/Auth";
import SignUp from "./components/SignUp";
import config from "./config";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setUserToStoreAction} from "./redux/auth/actions";
import Account from "./components/Account";
import {getAccountInfoAction, setAccountToStoreAction} from "./redux/account/actions";
import _ from "lodash";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";

interface IReduxProps {
    user?: Partial<IUser>;
    account?: IAccount;
    setUserToStore: (user: Partial<IUser>) => void;
    setAccountToStore: (account: IAccount) => void;
    getAccountInfo: (accountId: string) => void;
}

class AppRouter extends React.PureComponent<IReduxProps> {

    render() {
        const {user} = this.props;
        this.synchronizeStores(user);
        return (
            <React.Fragment>
                {!!user && <PrimarySearchAppBar/>}
                <BrowserRouter>
                    {this.getSwitch(!!user)}
                </BrowserRouter>
                {/* [TODO] Add <SnackBarWrapper/> here*/}
            </React.Fragment>
        )
    }

    private synchronizeStores = (user?: Partial<IUser>) => {
        const {setUserToStore} = this.props;
        const userFromLocalStorage = localStorage.getItem("user");
        if (!user && userFromLocalStorage) {
            setUserToStore(JSON.parse(userFromLocalStorage));
        }
        if (user && !userFromLocalStorage) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    };

    private getSwitch = (isUserLoggedIn: boolean) => {
        if (isUserLoggedIn) {
            return (
                <Switch>
                    {this.hasAccount() && <Redirect exact={true} from='*' to={config.appRouterLinks.ACCOUNT}/>}
                    <Route
                        exact={true}
                        path={config.appRouterLinks.ACCOUNT}
                        render={() => <Account/>}
                    />
                    <Route
                        exact={true}
                        path={'*'}
                        render={() => <HomePage/>}
                    />
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route
                        exact={true}
                        path={config.appRouterLinks.SIGN_UP}
                        render={() => <SignUp/>}
                    />
                    <Route
                        exact={true}
                        path='*'
                        render={() => <Auth/>}
                    />
                </Switch>
            )
        }
    };

    private hasAccount = () => {
        const {account, user, getAccountInfo} = this.props;
        if (!account && user && user.accounts && !_.isEmpty(user.accounts)) {
            getAccountInfo(user.accounts[0]);
            return true;
        } else {
            return false;
        }
    }
}

const mapStateToProps = (store: IStore) => ({
    user: store.user,
    account: store.account
});

const mapDispatchToProps = (dispatch: any) => ({
    setUserToStore: bindActionCreators((user: Partial<IUser>) => setUserToStoreAction(user), dispatch),
    getAccountInfo:  bindActionCreators((accountId: string) => getAccountInfoAction(accountId), dispatch),
    setAccountToStore: bindActionCreators((account: IAccount) => setAccountToStoreAction(account), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter as any);