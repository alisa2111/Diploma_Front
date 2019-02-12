import React, { Component } from 'react';
import {IAccount, IStore, IUser} from "../models";
import {connect} from "react-redux";
import {PieChart} from 'react-easy-chart';

// material ui version 3.6.2

interface IReduxProps {
    account: IAccount;
}

class Account extends React.PureComponent <IReduxProps, {}> {
    render() {
        const {account} = this.props;
        return (
           <React.Fragment>
               <h1>ACCOUNT PAGE</h1>
               <p>BALANCE: {account.balance}</p>

               <PieChart
                   labels
                   innerHoleSize={200}
                   data={[
                       {key: 'A', value: 100, color: '#aaac84'},
                       {key: 'B', value: 200, color: '#dce7c5'},
                       {key: 'C', value: 50, color: '#e3a51a'}
                   ]}
                   styles={{
                       '.chart_text': {
                           fontSize: '1em',
                           fill: '#fff'
                       }
                   }}
               />

           </React.Fragment>
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
});

export default connect(mapStateToProps, {})(Account as any);