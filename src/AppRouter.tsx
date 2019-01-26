import * as React from "react";
import {IStore, IUser} from "./models";
import {BrowserRouter} from 'react-router-dom';
import {Redirect, Route, Switch} from "react-router";
import {HomePage} from "./components/HomePage";
import Auth from "./components/Auth";
import SignUp from "./components/SignUp";
import config from "./config";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setUserToStoreAction} from "./redux/actions";

interface IReduxProps {
    user?: Partial<IUser>;
    setUserToStore: (user: Partial<IUser>) => void;
}

class AppRouter extends React.PureComponent<IReduxProps> {


    render() {
        const {user} = this.props;
        const userFromLocalStorage = localStorage.getItem("user");
        if (!user && userFromLocalStorage) {
            this.props.setUserToStore(JSON.parse(userFromLocalStorage));
        }
        if (user && !userFromLocalStorage) {
            localStorage.setItem("user", JSON.stringify(user));
        }
        if (user) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact={true}
                            path={'*'}
                            render={() => <HomePage user={user}/>}
                        />
                    </Switch>
                </BrowserRouter>
            )
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact={true}
                            path={config.links.SIGN_UP}
                            render={() => <SignUp/>}
                        />
                        <Route
                            exact={true}
                            path='*'
                            render={() => <Auth/>}
                        />
                    </Switch>
                </BrowserRouter>
            )
        }
    }
}

const mapStateToProps = (store: IStore) => ({
    user: store.user,
});

const mapDispatchToProps = (dispatch: any) => ({
    setUserToStore: bindActionCreators((user: Partial<IUser>) => setUserToStoreAction(user), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter as any);