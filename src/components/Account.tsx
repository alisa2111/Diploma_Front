import React, {Component} from 'react';
import {IAccount, IExpense, IStore,} from "../models";
import {connect} from "react-redux";
import {PieChart} from 'react-easy-chart';
import Expenses from "./Expenses";

// material ui version 3.6.2

interface IReduxProps {
    account: IAccount;
    expenses: IExpense[];
}

class Account extends React.PureComponent <IReduxProps> {

    render() {
        const {account, expenses = [{value: 100, color: "green", key: "no expenses"}]} = this.props;
        return (
            <div style={styles.accountContainer}>

                <div style={styles.pieChart}>
                    <PieChart
                        labels
                        innerHoleSize={300}
                        data={expenses}
                    />
                </div>

                <div style={styles.expensesList}>
                    <Expenses/>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    expenses: store.expenses,
});

export default connect(mapStateToProps, {})(Account as any);

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