import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {IAccount, IStore, IUser} from "../../models";
import {getAccountUsers, sendInvite} from "../../redux/account/actions";
import _ from "lodash";
import {Avatar, Card, CardHeader, IconButton} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

interface IReduxProps {
    account: IAccount;
    users: IUser[];
    sendInvite: (email: string, accountId: string) => void;
    getAccountUsers: (accountId: string) => void;
}

interface IProps extends IReduxProps {
    classes: {
        mainContainer: string,
        div: string,
        usersContainer: string,
        card: string,
        inviteContainer: string,
        emailInput: string,
        inviteButton: string
    }
}

interface IState {
    email: string;
}

class AccountSettings extends React.PureComponent<IProps, IState> {

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
        const {users, classes} = this.props;

        return (
            <div className={classes.mainContainer}>
                <div className={classNames(classes.usersContainer, classes.div)}>
                    <h2>Пользователи аккаунта: </h2>
                    {
                        users && users.map((user, index) =>
                            <Card key={`user-${index}`} className={classes.card}>
                                <CardHeader
                                    avatar={
                                        <Avatar src={user.picture}/>
                                    }
                                    action={
                                        <IconButton>
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }
                                    title={user.name}
                                    subheader={user.email}
                                />
                            </Card>
                        )
                    }
                </div>
                <div className={classNames(classes.inviteContainer, classes.div)}>
                    <h2>Пригласить нового участника:</h2>
                    <TextField
                        id="email-input"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        onChange={this.setEmail}
                        className={classes.emailInput}
                    />
                    <Button onClick={this.onInvite} className={classes.inviteButton} variant="contained">
                        Пригласить
                        <SendIcon/>
                    </Button>
                </div>
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

const styles = () => createStyles({
    mainContainer: {
        display: 'flex',
        marginLeft: '1%'
    },
    div: {
        display: 'inline-block'
    },
    usersContainer: {
        width: '40%',
        minWidth: '400px',
    },
    card: {
        marginBottom: '4px'
    },
    inviteContainer: {
        minWidth: '200px',
        width: '40%',
        marginLeft: '40px',
    },
    emailInput: {
        width: '60%'
    },
    inviteButton: {
        backgroundColor: 'green',
        color: 'white',
        marginLeft: '5%',
        width: '35%',
        maxWidth: '150px',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountSettings));