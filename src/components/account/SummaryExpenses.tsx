import React from "react";
import {IAccount, IMoneyFlow, ISource, IStore, ISummaryExpense} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchSummaryExpenses} from "../../redux/moneyFlow/actions";
import AccountCategory from "./AccountCategory";
import {CircularProgress} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import AddMoneyFlowModal from "./AddMoneyFlowModal";

const styles = () => createStyles({
    categoriesContainer: {
        display: "flex"
    },
    formControl: {
        minWidth: 150
    }
});

interface IReduxProps {
    account: IAccount;
    sources: ISource[]
    onAddExpense: (expense: IMoneyFlow, accountId: string) => void;
    fetchSummaryExpenses: (accountId: string) => void;
}

interface IProps extends IReduxProps {
    summaryExpenses: ISummaryExpense[];
    classes: {
        categoriesContainer: string
        formControl: string
    };
}

interface IState {
    modalOpen: boolean;
    categoryId: string;
    categoryTitle: string;
}

class SummaryExpenses extends React.PureComponent <IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            modalOpen: false,
            categoryId: "",
            categoryTitle: ""
        }
    }

    componentWillMount() {
        this.props.fetchSummaryExpenses(this.props.account.id);
    }

    render() {
        const {modalOpen, categoryTitle, categoryId} = this.state;
        const {summaryExpenses, account, classes} = this.props;
        if (!(summaryExpenses && account)) return (<CircularProgress/>);
        return (
            <div>
                <h2>Категории расходов</h2>
                <div className={classes.categoriesContainer}>
                    {
                        summaryExpenses &&
                        summaryExpenses.map(summaryExpense => {
                            return <AccountCategory
                                key={summaryExpense.title}
                                summaryExpense={summaryExpense}
                                handleClick={this.openAddExpenseModal}
                            />
                        })
                    }
                </div>
                <AddMoneyFlowModal
                    open={modalOpen}
                    accountId={account.id}
                    categoryId={categoryId}
                    categoryTitle={categoryTitle}
                    type={"expense"}
                    onClose={this.handleCloseExpenseModal}
                />
            </div>
        )
    }

    private openAddExpenseModal = (categoryId: string, categoryTitle: string) => () => this.setState({
        modalOpen: true,
        categoryId,
        categoryTitle
    });

    private handleCloseExpenseModal = () => this.setState({modalOpen: false, categoryId: "", categoryTitle: ""});
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    summaryExpenses: store.summaryExpenses,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchSummaryExpenses: bindActionCreators(accountId => fetchSummaryExpenses(accountId), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SummaryExpenses));