import React, {Component} from 'react';
import {IAccount, IStore, ISummaryExpense} from "../../models";
import {connect} from "react-redux";
import {PieChart} from 'react-easy-chart';
import Sources from "./Sources";
import SummaryExpenses from "./SummaryExpenses";
import * as moment from "moment";
import {Paper} from "@material-ui/core";
import Spinner from "../common/Spinner";
import * as _ from 'lodash';

// material ui version 3.6.2

interface IReduxProps {
    account: IAccount;
    summaryExpenses: ISummaryExpense[];
}

class Account extends React.PureComponent <IReduxProps> {

    render() {
        const {summaryExpenses, account} = this.props;
        const today = Date.now();
        const pieChartData = _.filter(summaryExpenses, expense => expense.totalAmount !== 0);

        if (!account) {
            return (<Spinner/>);
        }

        return (
            <Paper style={styles.accountContainer}>
                <Sources/>
                <div style={styles.pieChart}>
                    <PieChart
                        labels
                        innerHoleSize={220}
                        size={300}
                        data={!_.isEmpty(pieChartData) ? pieChartData.map(data => {
                            return {
                                key: data.title,
                                value: data.totalAmount,
                                color: data.color
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
    account: store.account,
    summaryExpenses: store.summaryExpenses,
});

export default connect(mapStateToProps, null)(Account as any);

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