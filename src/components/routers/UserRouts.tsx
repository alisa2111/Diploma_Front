import React from "react";
import {Route, Switch} from "react-router-dom";
import config from "../../config";
import Account from "../account/Account";
import HistoryPage from "../history/HistoryPage";
import {IUser} from "../../models";
import CategorySettings from "../category/CategorySettings";
import SourceSettings from "../source/SourceSettings";
import AccountSettings from "../account/AccountSettings";

interface IProps {
    user: Partial<IUser>;
}

export default class UserRouts extends React.Component <IProps, {}> {

    render() {
        return (
                <Switch>
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
                        path={config.appRouterLinks.SOURCE}
                        render={() => <SourceSettings/>}
                    />

                    <Route
                        exact={true}
                        path={config.appRouterLinks.SETTINGS}
                        render={() => <AccountSettings/>}
                    />

                    <Route
                        exact={true}
                        path={"*"}
                        render={() => <Account/>}
                    />
                </Switch>
        );
    }
}