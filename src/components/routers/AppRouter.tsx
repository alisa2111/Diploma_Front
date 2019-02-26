import * as React from "react";
import {IAccount, ISnackbar, IStore, IUser} from "../../models";
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from "react-router";
import Auth from "../Auth";
import SignUp from "../SignUp";
import config from "../../config";
import {connect} from "react-redux";
import {setUserToStoreAction} from "../../redux/auth/actions";
import SnackbarWrapper from "../notifications/SnackbarWrapper";
import MenuWrapper from "../menu/MenuWrapper";
import {bindActionCreators} from "redux";

interface IReduxProps {
    user?: Partial<IUser>;
    isSignInFailed: boolean,
    account?: IAccount;
    snackbar: ISnackbar;
    setUserToStore: (user: Partial<IUser>) => void;
}

class AppRouter extends React.PureComponent<IReduxProps> {

    render() {
        const {user, snackbar, isSignInFailed, account} = this.props;
        this.synchronizeStores(user);
        return (
            <React.Fragment>
                {!!user ?
                    <MenuWrapper user={user} account={account}/> :
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact={true}
                                path={config.appRouterLinks.SIGN_UP}
                                render={() => <SignUp/>}
                            />
                            <Route
                                exact={true}
                                path='*'
                                render={() => <Auth isSignInFailed={isSignInFailed}/>}
                            />
                        </Switch>
                    </BrowserRouter>}
                {snackbar && <SnackbarWrapper open={snackbar.isOpen} message={snackbar.message} type={snackbar.type}/>}
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
}

const mapStateToProps = (store: IStore) => ({
    user: store.user,
    account: store.account,
    snackbar: store.snackbar,
    isSignInFailed: store.signInFailed
});

const mapDispatchToProps = (dispatch: any) => ({
    setUserToStore: bindActionCreators((user: Partial<IUser>) => setUserToStoreAction(user), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter as any);