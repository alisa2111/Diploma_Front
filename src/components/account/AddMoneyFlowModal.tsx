import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    DialogTitle,
    FormControl,
    InputLabel, Select, MenuItem
} from "@material-ui/core";
import {IMoneyFlow, ISource, IStore} from "../../models";
import _ from "lodash";
import {bindActionCreators} from "redux";
import {addMoneyFlow} from "../../redux/moneyFlow/actions";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import {snackbarErrorNotification} from "../../redux/general/actions";

interface IState {
    moneyFlow: IMoneyFlow
}

interface IReduxProps {
    sources: ISource[]
    onError: (message: string) => void;
    onAddMoneyFlow: (moneyFlow: IMoneyFlow) => void;
}

interface IProps extends IReduxProps {
    open: boolean
    accountId: string
    categoryId?: string
    category?: string
    sourceId?: string
    type: string //IMoneyFlow type
    onClose: () => void;
    classes: {
        formControl: string
    }
}

class AddMoneyFlowModal extends React.PureComponent<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            moneyFlow: {
                type: this.props.type,
                accountId: this.props.accountId,
                categoryId: "",
                amount: 0,
                sourceId: ""
            }
        }
    };

    componentWillReceiveProps(nextProps: IProps): void {
        this.setState({
            moneyFlow: {
                type: this.props.type,
                accountId: nextProps.accountId,
                categoryId: nextProps.categoryId,
                amount: 0,
                sourceId: nextProps.sourceId ? nextProps.sourceId : ""
            }
        });
    }

    render() {
        const {moneyFlow} = this.state;
        const {open, onClose, category, sources, classes} = this.props;
        if (!(sources)) return null;
        return (
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>{moneyFlow.type === "expense" ? `Расход: ${category}` : "Доход"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Сумма"
                        type="number"
                        fullWidth
                        onChange={this.handleMoneyFlowChange("amount")}
                    />
                    <TextField
                        multiline
                        margin="dense"
                        id="comment"
                        label="Комментрий"
                        type="text"
                        fullWidth
                        onChange={this.handleMoneyFlowChange("comment")}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel>{moneyFlow.type === "expense" ? "Снять средства с:" : "Добавить средства на:"}</InputLabel>
                        <Select
                            value={moneyFlow.sourceId}
                            onChange={this.handleMoneyFlowChange("sourceId")}
                        >
                            <MenuItem value="" disabled>
                                <em>Выберите источник</em>
                            </MenuItem>
                            {sources.map(source =>
                                <MenuItem
                                    key={source.id}
                                    value={source.id}
                                >
                                    {source.title}
                                </MenuItem>)}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отмена
                    </Button>
                    <Button
                        onClick={this.handleAdd}
                        disabled={_.isEmpty(moneyFlow.amount) || _.isEmpty(moneyFlow.sourceId)}
                        color="primary">
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    private handleMoneyFlowChange = (field: string) => (e: any) => {
        const clonedMoneyFLow = _.clone(this.state.moneyFlow);
        this.setState({
            moneyFlow: _.assign(clonedMoneyFLow, {[field]: e.target.value}),
        });
    };

    private handleAdd = () => {
        const {moneyFlow} = this.state;
        const source = _.find(this.props.sources, s => s.id === moneyFlow.sourceId);
        if (moneyFlow.type === 'expense' && source && source.balance < moneyFlow.amount) {
            this.props.onError(`На '${source.title}' недостаточно средств. (Доступно: ${source.balance})`);
        } else {
            this.props.onAddMoneyFlow(this.state.moneyFlow);
            this.props.onClose();
        }
    };
}

const styles = () => createStyles({
    formControl: {
        minWidth: "200px"
    }
});

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    summaryExpenses: store.summaryExpenses,
    sources: store.sources
});

const mapDispatchToProps = (dispatch: any) => ({
    onError: bindActionCreators(message => snackbarErrorNotification(message), dispatch),
    onAddMoneyFlow: bindActionCreators(moneyFlow => addMoneyFlow(moneyFlow), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddMoneyFlowModal));