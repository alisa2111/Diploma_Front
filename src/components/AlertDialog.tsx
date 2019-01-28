import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

interface IProps {
    isOpen: boolean;
    handleClose: () => void;
}

export class AlertDialog extends React.PureComponent <IProps> {
    render() {
        return(
            <Dialog
                open={this.props.isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Приветик :)"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Здесь рассказать, чот будет по нажатию на эту кнопку и чтобы пользователь подтвердил,
                        что хочет открыть счет. Попробовать реализовать через проп "title" super
                        и childrenm чтобы можно было переиспользоввать красивый диалог для вывода сообщений пользователю.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" autoFocus>
                        Окей,я всё понял, хочу открыть счет.
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}