import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import {signInAction} from "../redux/auth/actions";
import {IUser} from "../models";
import _ from "lodash";
import config from "../config";
import {Paper} from "@material-ui/core";

interface IAuthStyles {
    signInContainer: React.CSSProperties;
    signInFailedContainer: React.CSSProperties;
    button: React.CSSProperties; // sign in button
}

interface IReduxProps {
    onSignIn: (user: Partial<IUser>, inviteId: string | null) => void;
}

interface IState {
    user: Partial<IUser>
    isEmptyForm: boolean
}

interface IProps extends IReduxProps {
    isSignInFailed: boolean
}

class Auth extends React.PureComponent <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            user: {},
            isEmptyForm: false
        };
    }

    render() {
        return (
            <div style={styles.signInContainer}>
                {(this.props.isSignInFailed || this.state.isEmptyForm)
                && <Paper style={styles.signInFailedContainer}>
                    {this.state.isEmptyForm ? "Заполните все поля!" : "Неверный логин или пароль!"}
                </Paper>}
                <TextField
                    id="filled-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.setUser("email")}
                    onKeyDown={this.handleKeyDown}
                />
                <TextField
                    id="filled-password-input"
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.setUser("password")}
                    onKeyDown={this.handleKeyDown}
                />
                <Button
                    onClick={this.handleSignIn}
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    style={styles.button}
                >
                    Войти
                </Button>
                <Button
                    href={config.appRouterLinks.SIGN_UP}
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    style={styles.button}
                >
                    Зарегистрироваться
                </Button>
            </div>
        );
    }

    private setUser = (field: string) => (e: any) => _.assign(this.state.user, {[field]: e.target.value});

    private handleKeyDown = (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            this.handleSignIn();
        }
    };

    private isFormEmpty = () => {
        const {user} = this.state;
        if (_.isEmpty(user)) {
            return true;
        } else {
            return _.isEmpty(user.email) || _.isEmpty(user.password);
        }
    };

    private handleSignIn = () => {
        if (this.isFormEmpty()) {
            this.setState({isEmptyForm: true});
        } else {
            const  url = new URL(location.href);
            this.setState({isEmptyForm: false});
            this.props.onSignIn(this.state.user, url.searchParams.get("invite"));
        }
    }
}

const   styles: IAuthStyles = {
    signInContainer: {
        maxWidth: "400px",
        margin: "15% auto",
    },
    signInFailedContainer: {
        textAlign: "center",
        padding: "15px",
        fontSize: "20px",
        backgroundColor: "#ff000026",
        border: "2px solid #ff000096",
        color: "#fe0000ba"
    },
    button: {
        maxWidth: "200px",
        margin: "3% auto",
        display: "block",
        textAlign: "center"
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    onSignIn: bindActionCreators((user, inviteId) => signInAction(user, inviteId), dispatch),
});

export default connect(null, mapDispatchToProps)(Auth);