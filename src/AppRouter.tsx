import * as React from "react";
import {IUser} from "./models";
import { BrowserRouter } from 'react-router-dom';
import {Redirect, Route, Switch} from "react-router";
import {HomePage} from "./components/HomePage";
import Auth from "./components/Auth";
import SignUp from "./components/SignUp";
import config from "./config";

interface IProps {
    user?: Partial<IUser>;
}

export default class AppRouter extends React.PureComponent<IProps> {
    render() {
        const {user} = this.props;
        if (user) {
            return(
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