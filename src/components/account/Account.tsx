import React, {Component} from 'react';
import {IAccount, IStore, ISummaryExpense, IUser} from "../../models";
import {connect} from "react-redux";
import {PieChart} from 'react-easy-chart';
import Sources from "./Sources";
import {bindActionCreators} from "redux";
import {getAccountInfoAction} from "../../redux/account/actions";
import {CircularProgress} from "@material-ui/core";
import SummaryExpenses from "./SummaryExpenses";

// material ui version 3.6.2

interface IReduxProps {
    user: IUser;
    account: IAccount;
    getAccountInfo: (accountId: string) => void;
    summaryExpenses: ISummaryExpense[];
}

class Account extends React.PureComponent <IReduxProps> {

    componentWillMount(){
        this.props.getAccountInfo(this.props.user.accounts[0])
    }

    render() {
        const {summaryExpenses, account} = this.props;

        if (!account) {
            return <CircularProgress/>
        }

        return (
            <div style={styles.accountContainer}>

                <div style={styles.pieChart}>
                    <PieChart
                        labels
                        innerHoleSize={300}
                        data={summaryExpenses ? summaryExpenses.map(summaryExpense => {
                            return {
                                key: summaryExpense.title,
                                value: summaryExpense.totalAmount,
                                color: summaryExpense.color
                            }
                        }) : [{key: "", value: 1, color: "lightgreen"}]}
                    />
                    <Sources/>
                </div>

                <div style={styles.expensesList}>
                    <SummaryExpenses/>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    user: store.user,
    account: store.account,
    summaryExpenses: store.summaryExpenses,
});

const mapDispatchToProps = (dispatch: any) => ({
    getAccountInfo: bindActionCreators((accountId: string) => getAccountInfoAction(accountId), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account as any);

const styles = {
    accountContainer: {
        display: "flex",
        height: "85vh",
    },
    pieChart: {
        margin: "auto 0 auto 100px"
    },
    expensesList: {
        marginLeft: "50px",
    }
};