import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {IAccount, IStore} from "../../models";
import {sendInvite} from "../../redux/account/actions";

interface IReduxProps {
    account: IAccount;
    sendInvite: (email: string, accountId: string) => void;
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

    render() {
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
            </div>
        )
    }

    private setEmail = (event: any) => this.setState({ email: event.target.value });

    private onInvite = () => {
        // TODO check email
        this.props.sendInvite(this.state.email, this.props.account.id);
    }
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
});

const mapDispatchToProps = (dispatch: any) => ({
    sendInvite: bindActionCreators((email, accountId) => sendInvite(email, accountId), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);