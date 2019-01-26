import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import {signInAction} from "../redux/actions";
import {IUser} from "../models";
import _ from "lodash";
import config from "../config";

interface IAuthStyles {
    signInContainer: React.CSSProperties;
    button: React.CSSProperties; // sign in button
}

interface IReduxProps {
    onSignIn: (user: Partial<IUser>) => void;
}

interface IState {
    user: Partial<IUser>
}

interface IProps extends IReduxProps {}

class Auth extends React.PureComponent <IProps, IState> {

    styles: IAuthStyles = {
        signInContainer: {
            maxWidth: "400px",
            margin: "15% auto",
        },
        button: {
            maxWidth: "200px",
            margin: "3% auto",
            display: "block",
            textAlign: "center"
        }
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
          user: {}
        };
    }

    render() {
        return (
            <div style={this.styles.signInContainer}>
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
                />
                <Button
                    onClick={this.handleSignIn}
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    style={this.styles.button}
                >
                    Войти
                </Button>
                <Button
                    href={config.links.SIGN_UP}
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    style={this.styles.button}
                >
                    Зарегистрироваться
                </Button>
            </div>
        );
    }

    private setUser = (field: string) => (e: any) => _.assign(this.state.user, {[field]:  e.target.value});

    private handleSignIn = () => this.props.onSignIn(this.state.user);

}

const mapDispatchToProps = (dispatch: any) => ({
    onSignIn: bindActionCreators(user => signInAction(user), dispatch),
});

export default connect(null, mapDispatchToProps)(Auth as any);