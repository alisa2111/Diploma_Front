import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import {signUpAction} from "../redux/auth/actions";
import {IUser} from "../models";
import _ from "lodash";
import {FormHelperText} from "@material-ui/core";

interface ISignUpStyles {
    signUpContainer: React.CSSProperties;
    button: React.CSSProperties;
    helper: React.CSSProperties;
}

interface IReduxProps {
    onSignUp: (user: Partial<IUser>, inviteId: string | null) => void;
}

interface IState {
    user: Partial<IUser>
    confPassword: string
    invalidFields: string[]
}

interface IProps extends IReduxProps {
}

class SignUp extends React.PureComponent <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            user: {},
            confPassword: "",
            invalidFields: []
        };
    }

    render() {
        return (
            <div style={styles.signUpContainer}>
                <TextField
                    id="email-input"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.setUser("email")}
                />
                {_.includes(this.state.invalidFields, "email") &&
                    <FormHelperText
                        style={styles.helper}
                        error={true}>
                        Пример: example.email@domen.com
                    </FormHelperText>}
                <TextField
                    id="name-input"
                    label="Ваше имя"
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.setUser("name")}
                />
                {_.includes(this.state.invalidFields, "name") &&
                    <FormHelperText
                        style={styles.helper}
                        error={true}>
                        Имя обязательное поле
                    </FormHelperText>}
                <TextField
                    id="password-input"
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.setUser("password")}
                />
                {_.includes(this.state.invalidFields, "password") &&
                    <FormHelperText
                        style={styles.helper}
                        error={true}>
                        Пароль должен содержать буквы латинского алфавита верхнего и нижнего регистра и цифры
                    </FormHelperText>}
                <TextField
                    id="confirmation-password-input"
                    label="Повторите пароль"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.setConfirmationPassword}
                />
                {_.includes(this.state.invalidFields, "confPassword") &&
                    <FormHelperText
                        style={styles.helper}
                        error={true}>
                        Пароли не совпадают
                    </FormHelperText>}
                <Button
                    onClick={this.handleSignUp}
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    style={styles.button}
                >
                    Зарегистрироваться
                </Button>
                <Button
                    href={"/"}
                    variant="outlined"
                    color="secondary"
                    fullWidth={true}
                    style={styles.button}
                >
                    Уже есть учетная запись?
                </Button>
            </div>
        );
    }

    private setUser = (field: string) => (e: any) => {
        const clonedUser = _.clone(this.state.user);
        this.setState({
            user: _.assign(clonedUser, {[field]: e.target.value}),
        });
    };

    private setConfirmationPassword = (e: any) => this.setState({confPassword: e.target.value});

    private validateForm = () => {
        const invalidFields = [];
        const {email, name, password} = this.state.user;
        const {confPassword} = this.state;
        if (!(email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            invalidFields.push("email");
        }
        if (!name) {
            invalidFields.push("name");
        }
        if (!(password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password))) {
            invalidFields.push("password");
        }
        if (!(confPassword && password && confPassword === password)) {
            invalidFields.push("confPassword");
        }
        this.setState({
            invalidFields: invalidFields
        });
        return invalidFields;
    };

    private handleSignUp = () => {
        if (_.isEmpty(this.validateForm())) {
            const  url = new URL(location.href);
            this.props.onSignUp(this.state.user, url.searchParams.get("invite"))
        }
    };

}

const styles: ISignUpStyles = {
    signUpContainer: {
        maxWidth: "400px",
        margin: "15% auto",
    },
    button: {
        maxWidth: "400px",
        margin: "10px 0 0 0",
    },
    helper: {
        marginTop: "-3px"
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    onSignUp: bindActionCreators((user, inviteId) => signUpAction(user, inviteId), dispatch),
});

export default connect(null, mapDispatchToProps)(SignUp as any);