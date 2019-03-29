import React from "react";
import {IStore, IUser} from "../models";
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import AlertDialog from "./AlertDialog";

interface IReduxProps {
    user: Partial<IUser>
}

interface IState {
    isDialogOpen: boolean;
}

class HomePage extends React.PureComponent <IReduxProps, IState> {

    constructor(props: IReduxProps) {
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
                <h1>{`Привет, ${user.name}`}</h1>
                <Button
                    onClick={this.handleDialog}
                    variant="contained"
                    color="secondary"
                >
                    Открыть счет
                </Button>

                <AlertDialog
                    isOpen={isDialogOpen}
                    handleClose={this.handleDialog}
                />
            </div>
        )
    }

    private handleDialog = () => this.setState({isDialogOpen: !this.state.isDialogOpen});
}

const mapStateToProps = (store: IStore) => ({
    user: store.user,
});

export default connect(mapStateToProps, null)(HomePage as any);