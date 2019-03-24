import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {IStore, IUser} from "../models";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createAccount} from "../redux/account/actions";

interface IReduxProps {
    user: Partial<IUser>
    onCreateAccount: (user: Partial<IUser>, accountName: string) => void;
}

interface IProps extends IReduxProps {
    isOpen: boolean;
    handleClose: () => void;
}

interface IState {
    accountName: string;
}

class AlertDialog extends React.PureComponent <IProps, IState> {
    render() {
        return(
            <Dialog
                open={this.props.isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Приветик :)"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название счета"
                        name="account_name"
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                        onChange={this.setAccountName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCreateAccount} color="primary" autoFocus>
                        Окей,я всё понял, хочу открыть счет.
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    private setAccountName = (e: any) => this.setState({accountName: e.target.value});

    private handleCreateAccount = () => this.props.onCreateAccount(this.props.user, this.state.accountName)
}

const mapStateToProps = (store: IStore) => ({
    user: store.user,
});

const mapDispatchToProps = (dispatch: any) => ({
    onCreateAccount: bindActionCreators((user, accountName) => createAccount(user.id, accountName), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);