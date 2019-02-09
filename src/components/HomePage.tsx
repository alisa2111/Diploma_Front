import React from "react";
import {IStore, IUser} from "../models";
import Button from '@material-ui/core/Button';
import {AlertDialog} from "./AlertDialog";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import {createAccountAction} from "../redux/account/actions";

interface IReduxProps {
    user: Partial<IUser>
    onCreateAccount: (user: Partial<IUser>) => void;
}

// delete in future if it will be stay unused
interface IProps extends IReduxProps{}

interface IState {
    isDialogOpen: boolean;
}

class HomePage extends React.PureComponent <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isDialogOpen: false,
        };
    }

    render() {
        const {user} = this.props;
        const {isDialogOpen} = this.state;
        return(
            <div>
                <PrimarySearchAppBar/>
                <h1>{`HELLO, ${user.name}`}</h1>
                <Button
                    onClick={this.handaleDialog}
                    variant="contained"
                    color="secondary"
                >
                    Открыть свой счет
                </Button>

                {/* [TODO]rename handleClose*/}
                <AlertDialog isOpen={isDialogOpen} handleClose={this.handleCreateAccount}/>
            </div>
        )
    }

    private handaleDialog = () => this.setState({isDialogOpen: !this.state.isDialogOpen});

    private handleCreateAccount = () => this.props.onCreateAccount(this.props.user);
}

const mapStateToProps = (store: IStore) => ({
    user: store.user,
});

const mapDispatchToProps = (dispatch: any) => ({
    onCreateAccount: bindActionCreators(user => createAccountAction(user.id), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage as any);