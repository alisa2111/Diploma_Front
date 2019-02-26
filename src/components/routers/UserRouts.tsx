import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import config from "../../config";
import HomePage from "../HomePage";
import Account from "../Account";
import {IAccount, IUser} from "../../models";
import {connect} from "react-redux";
import _ from "lodash";
import {getAccountInfoAction} from "../../redux/account/actions";
import {bindActionCreators} from "redux";

interface IReduxProps {
    getAccountInfo: (accountId: string) => void;
}

interface IProps extends IReduxProps {
    user: Partial<IUser>;
    account?: IAccount;
}

class UserRouts extends React.Component <IProps, {}> {

    render() {
        return (
            <BrowserRouter>
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
            </BrowserRouter>
        );
    }

    private hasAccount = () => {
        const {account, user, getAccountInfo} = this.props;
        if (!account && user.accounts && !_.isEmpty(user.accounts)) {
            getAccountInfo(user.accounts[0]);
            return true;
        } else {
            return false;
        }
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    getAccountInfo: bindActionCreators((accountId: string) => getAccountInfoAction(accountId), dispatch),
});

export default connect(null, mapDispatchToProps)(UserRouts);