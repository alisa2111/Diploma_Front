import React, {Component} from 'react';
import {IAccount, IStore, ISummaryExpense, IUser} from "../../models";
import {connect} from "react-redux";
import {PieChart} from 'react-easy-chart';
import Sources from "./Sources";
import {bindActionCreators} from "redux";
import {getAccountInfoAction} from "../../redux/account/actions";
import {CircularProgress} from "@material-ui/core";
import SummaryExpenses from "./SummaryExpenses";
import * as moment from "moment";
import {Paper} from "@material-ui/core";

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
        const today = Date.now();

        if (!account) {
            return <CircularProgress/>
        }

        return (
            <Paper style={styles.accountContainer}>
                <Sources/>
                <div style={styles.pieChart}>
                    <PieChart
                        labels
                        innerHoleSize={220}
                        size={300}
                        data={summaryExpenses ? summaryExpenses.map(summaryExpense => {
                            return {
                                key: summaryExpense.title,
                                value: summaryExpense.totalAmount,
                                color: summaryExpense.color
                            }
                        }) : [{key: "", value: 1, color: "lightgreen"}]}
                    />
                    <p style={styles.date}>{moment.utc(today).format("DD.MM.YYYY")}</p>
                </div>
                <SummaryExpenses/>
            </Paper>
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
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        height: "91vh",
    },
    pieChart: {
        margin: "60px 5% 0 5%"
    },
    expensesList: {
        marginLeft: "50px",
    },
    date: {
        fontSize: "25px",
        width: "max-content",
        margin: "auto",
    }
};