import React from "react";
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home'
import FoodIcon from '@material-ui/icons/Fastfood'
import ShoppingIcon from '@material-ui/icons/ShoppingCart';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';

interface IState {
    isInputModalOpen: boolean;
    expense: {
        key: string;
        title: string;
        value?: number;
        // color: randomColor();
    };
}

export default class Expenses extends React.PureComponent <{}, IState> {

    constructor (props: any) {
        super(props);
        this.state = {
            isInputModalOpen: false,
            expense: {
                key: "",
                title: "",
                value: 0
            },
        }
    }

    render() {
        const {isInputModalOpen, expense} = this.state;
        return (
            <div>
                <IconButton onClick={this.handleOpenInputModal("home", "Дом")}> <HomeIcon/> </IconButton>
                <IconButton onClick={this.handleOpenInputModal("food", "Еда")}> <FoodIcon/> </IconButton>
                <IconButton onClick={this.handleOpenInputModal("shopping", "Шопинг")}> <ShoppingIcon/> </IconButton>

                <Dialog
                    open={isInputModalOpen}
                    onClose={this.handleCloseInputModal}
                >
                    <DialogTitle>{expense.title}</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={expense.value}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Сумма"
                            type="number"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseInputModal} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.handleCloseInputModal} color="primary">
                            Ок
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

    private handleOpenInputModal = (key: string, title: string) => () =>
        this.setState({
            isInputModalOpen: !this.state.isInputModalOpen,
            expense: {
                key,
                title,
            }
        });

    private handleCloseInputModal = () => this.setState({isInputModalOpen: false})
}