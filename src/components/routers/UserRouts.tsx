import React from "react";
import {Route, Switch} from "react-router-dom";
import config from "../../config";
import HomePage from "../HomePage";
import Account from "../account/Account";
import HistoryPage from "../history/HistoryPage";
import {IUser} from "../../models";
import _ from "lodash";
import CategorySettings from "../category/CategorySettings";

interface IProps {
    user: Partial<IUser>;
}

export default class UserRouts extends React.Component <IProps, {}> {

    render() {
        return (
                <Switch>

                    {!this.hasAccount() &&
                        <Route
                            exact={true}
                            path={'*'}
                            render={() => <HomePage/>}
                        />}

                    <Route
                        exact={true}
                        path={config.appRouterLinks.HISTORY}
                        render={() => <HistoryPage/>}
                    />

                    <Route
                        exact={true}
                        path={config.appRouterLinks.CATEGORY}
                        render={() => <CategorySettings/>}
                    />

                    <Route
                        exact={true}
                        path={"*"}
                        render={() => <Account/>}
                    />

                </Switch>
        );
    }

    private hasAccount = () => {
        const {user} = this.props;
        return !!(user && user.accounts && !_.isEmpty(user.accounts));
    }
}