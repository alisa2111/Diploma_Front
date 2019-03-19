import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import UndoIcon from '@material-ui/icons/Undo';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {withStyles} from '@material-ui/core/styles';
import {Icon} from "@material-ui/core";
import * as _ from 'lodash';

interface IProps {
    type: string
    message?: string
    classes: {
        success: string
        error: string
        info: string
        warning: string
        icon: string
        iconVariant: string
        message: string
        messageContent: string
        close: string
    }
    handleClose: () => void;
    undoButtonHandler?: () => void
}

interface IState {
    type: string
    message: string
}

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

class SnackbarContentWrapper extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            type: this.props.type,
            message: this.props.message || ""
        };
    };

    handleUndoButton = () => {
        const {undoButtonHandler, handleClose} = this.props;
        undoButtonHandler && undoButtonHandler();
        handleClose && handleClose();
    };

    render() {
        const {classes, handleClose, undoButtonHandler} = this.props;
        const {type, message} = this.state;
        const Icon = _.get(variantIcon, type);
        let actions = [
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
            >
                <CloseIcon/>
            </IconButton>
        ];
        if (undoButtonHandler) {
            actions.unshift(
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleUndoButton}
                >
                    <UndoIcon/>
                </IconButton>
            );
        }
        return (
            <SnackbarContent
                className={_.get(classes, type)}
                message={
                    <span className={classes.message}>
                        <Icon className={`${_.get(classes, 'icon')} ${_.get(classes, 'iconVariant')}`}/>
                        {message}
                    </span>
                }
                action={actions}
            />
        );
    }
}

const contentStyles = (theme: any) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

export default withStyles(contentStyles)(SnackbarContentWrapper as any);