import React from "react";
import _ from "lodash";
import {IAccount, IMoneyFlow, ISource, IStore, ISummaryExpense} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchSummaryExpenses} from "../../redux/moneyFlow/actions";
import AccountCategory from "./AccountCategory";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import AddMoneyFlowModal from "./AddMoneyFlowModal";
import Spinner from "../common/Spinner";

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
    category: string;
}

class SummaryExpenses extends React.PureComponent <IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            modalOpen: false,
            categoryId: "",
            category: ""
        }
    }

    componentWillMount() {
        this.props.fetchSummaryExpenses(this.props.account.id);
    }

    componentWillReceiveProps (nextProps: IReduxProps) {
        if (this.props.account.id !== nextProps.account.id) {
            this.props.fetchSummaryExpenses(nextProps.account.id);
        }
    }

    render() {
        const {modalOpen, category, categoryId} = this.state;
        const {summaryExpenses, account, classes} = this.props;
        if (!(summaryExpenses && account)) return (<Spinner/>);
        return (
            <div>
                <h2 className="header">Категории</h2>
                <div className={classes.categoriesContainer}>
                    {
                        summaryExpenses &&
                        _.sortBy(summaryExpenses, s => s.title).map(summaryExpense => {
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
                    category={category}
                    type={"expense"}
                    onClose={this.handleCloseExpenseModal}
                />
            </div>
        )
    }

    private openAddExpenseModal = (categoryId: string, category: string) => () => this.setState({
        modalOpen: true,
        categoryId,
        category
    });

    private handleCloseExpenseModal = () => this.setState({modalOpen: false, categoryId: "", category: ""});
}

const styles = () => createStyles({
    categoriesContainer: {
        display: "flex",
        maxWidth: "400px",
        flexWrap: "wrap",
    },
    formControl: {
        minWidth: 150
    }
});

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    summaryExpenses: store.summaryExpenses,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchSummaryExpenses: bindActionCreators(accountId => fetchSummaryExpenses(accountId), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SummaryExpenses));