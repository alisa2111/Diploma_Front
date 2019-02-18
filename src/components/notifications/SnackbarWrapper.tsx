import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {removeSnackBarAction} from "../../redux/general/actions";
import SnackbarContentWrapper from "./SnackbarContentWrapper";

interface IProps {
    open: boolean
    message?: string
    type?: string
    handleCloseSnackbar?: () => void
    undoButtonHandler?: () => void
}

interface IState {
    open: boolean
    type: string
}

class SnackbarWrapper extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            open: !!props.open,
            type: this.props.type || "info"
        };
    };

    handleClose = (event: any, reason?: any) => {
        if (reason === 'clickaway') {
            return;
        }
        const {handleCloseSnackbar} = this.props;
        handleCloseSnackbar && handleCloseSnackbar();
    };

    render() {
        const {message} = this.props;
        const {type} = this.state;
        return (
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={this.state.open}
                autoHideDuration={4000}
                onClose={this.handleClose}
            >
                <SnackbarContentWrapper
                    handleClose={this.handleClose}
                    message={message}
                    type={type}
                    undoButtonHandler={this.props.undoButtonHandler}
                />
            </Snackbar>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    handleCloseSnackbar: bindActionCreators(() => removeSnackBarAction(), dispatch),
});

export default connect(null, mapDispatchToProps)(SnackbarWrapper);