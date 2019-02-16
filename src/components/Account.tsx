import React, { Component } from 'react';
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
        // [TODO] fetch expenses
        const {account, expenses = []} = this.props;
        return (
           <React.Fragment>
               <h1>ACCOUNT PAGE</h1>
               <p>BALANCE: {account.balance}</p>

               <Expenses/>

               <PieChart
                   labels
                   innerHoleSize={300}
                   data={expenses}
                   // styles={{
                   //     '.chart_text': {
                   //         fontSize: '1em',
                   //         fill: '#b7ff6a'
                   //     }
                   // }}
               />

           </React.Fragment>
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    expenses: store.expenses,
});

export default connect(mapStateToProps, {})(Account as any);