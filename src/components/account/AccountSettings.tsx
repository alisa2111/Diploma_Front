import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {IAccount, IStore, IUser} from "../../models";
import {getAccountUsers, sendInvite} from "../../redux/account/actions";
import _ from "lodash";

interface IReduxProps {
    account: IAccount;
    users: IUser[];
    sendInvite: (email: string, accountId: string) => void;
    getAccountUsers: (accountId: string) => void;
}

interface IState {
    email: string;
}

class AccountSettings extends React.PureComponent<IReduxProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
        };
    };

    componentWillMount() {
        const {account, users, getAccountUsers} = this.props;
        if(account && _.isEmpty(users)) {
            getAccountUsers(account.id);
        }
    }

    render() {
        const {users} = this.props;

        return (
            <div>
                <TextField
                    id="email-input"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.setEmail}
                />
                <Button onClick={this.onInvite} color="primary">
                    Пригласить
                </Button>
                <h3>Пользователи аккаунта: </h3>
                {users && users.map((user, index) => <p key={`user-${index}`}>{user.name}</p>)}
            </div>
        )
    }

    private setEmail = (event: any) => this.setState({ email: event.target.value });

    private onInvite = () => this.props.sendInvite(this.state.email, this.props.account.id); // TODO check email

}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    users: store.users,
});

const mapDispatchToProps = (dispatch: any) => ({
    sendInvite: bindActionCreators((email, accountId) => sendInvite(email, accountId), dispatch),
    getAccountUsers: bindActionCreators((accountId) => getAccountUsers(accountId), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);