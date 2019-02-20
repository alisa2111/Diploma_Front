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
import {IAccount, IExpense, IStore} from "../models";
import {connect} from "react-redux";
import _ from "lodash";
import {bindActionCreators} from "redux";
import {fetchExpenses, updateExpenses} from "../redux/expenses/actions";

interface IReduxProps {
    account: IAccount;
    onAddExpense: (expense: IExpense, accountId: string) => void;
    onFetchExpenses: (accountId: string) => void;
}

interface IState {
    isInputModalOpen: boolean;
    expense: {
        key: string;
        title: string;
        comment?: string;
        value: number;
    };
}

class Expenses extends React.PureComponent <IReduxProps, IState> {

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

    componentWillMount(){
        this.props.onFetchExpenses(this.props.account.id);
    }

    render() {
        const {isInputModalOpen, expense} = this.state;
        return (
            <div>
                <IconButton onClick={this.handleOpenExpenseModal("home", "Дом")}> <HomeIcon/> </IconButton>
                <IconButton onClick={this.handleOpenExpenseModal("food", "Еда")}> <FoodIcon/> </IconButton>
                <IconButton onClick={this.handleOpenExpenseModal("shopping", "Шопинг")}> <ShoppingIcon/> </IconButton>

                <Dialog
                    open={isInputModalOpen}
                    onClose={this.handleCloseExpenseModal}
                >
                    <DialogTitle>{expense.title}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Сумма"
                            type="number"
                            fullWidth
                            onChange={this.handleExpenseChange("value")}
                        />
                        <TextField
                            multiline
                            margin="dense"
                            id="name"
                            label="Комментрий"
                            type="text"
                            fullWidth
                            onChange={this.handleExpenseChange("comment")}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseExpenseModal} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.handleAddExpense} color="primary" disabled={_.isEmpty(expense.value)}>
                            Добавить
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

    private handleOpenExpenseModal = (key: string, title: string) => () =>
        this.setState({
            isInputModalOpen: !this.state.isInputModalOpen,
            expense: {
                key,
                title,
                value: 0,
            }
        });

    private handleExpenseChange = (field: string) => (e: any) => {
        const clonedExpense = _.clone(this.state.expense);
        this.setState({
            expense: _.assign(clonedExpense, {[field]: e.target.value}),
        });
    };

    private handleAddExpense = () => {
        this.props.onAddExpense(this.state.expense, this.props.account.id);
        this.handleCloseExpenseModal(); // [TODO] snackBar "Добавлено"
    };

    private handleCloseExpenseModal = () => this.setState({isInputModalOpen: false});

}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
});

const mapDispatchToProps = (dispatch: any) => ({
    onAddExpense: bindActionCreators((expense, accountId) => updateExpenses(expense, accountId), dispatch),
    onFetchExpenses: bindActionCreators(accountId => fetchExpenses(accountId), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses as any);