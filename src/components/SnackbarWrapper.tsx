import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {removeSnackBarAction} from "../redux/general/actions";

const styles = (theme: any) => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

interface IProps {
    open: boolean
    message?: string
    handleCloseSnackbar?: () => void
    undoButtonHandler?: () => void
    classes: {
        close: string
    }
}

interface IState {
    open: boolean
}

class SnackbarWrapper extends React.Component<IProps, IState> {

    constructor(props: IProps) {
      super(props);
      this.state = {
          open: !!props.open,
      };
    };

    handleClose = (event: any, reason?: any) => {
        if (reason === 'clickaway') {
            return;
        }
        const {handleCloseSnackbar} = this.props;
        handleCloseSnackbar && handleCloseSnackbar();
    };

    handleUndoButton = (event: any, reason?: any) => {
        const {undoButtonHandler} = this.props;
        undoButtonHandler && undoButtonHandler();
        this.handleClose(event, reason);
    };

    render() {
        const {classes, message, undoButtonHandler} = this.props;
        let actions = [
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
            >
                <CloseIcon/>
            </IconButton>
        ];
        if (undoButtonHandler) {
            actions.unshift(
                <Button key="undo" color="secondary" size="small" onClick={this.handleUndoButton}>
                    Отменить
                </Button>
            );
        }
        return (
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                message={message}
                action={actions}
            />
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    handleCloseSnackbar: bindActionCreators(() => removeSnackBarAction(), dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(SnackbarWrapper));