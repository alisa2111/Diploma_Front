import React, { Component } from 'react';
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import {IAccount, IStore, IUser} from "../models";
import {connect} from "react-redux";

// material ui version 3.6.2

interface IReduxProps {
    account: IAccount;
}

class Account extends React.PureComponent <IReduxProps, {}> {
    render() {
        const {account} = this.props;
        return (
           <React.Fragment>
               <PrimarySearchAppBar/>
               <h1>ACCOUNT PAGE</h1>
               <p>BALANCE: {account.balance}</p>
           </React.Fragment>
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
});

export default connect(mapStateToProps, {})(Account as any);