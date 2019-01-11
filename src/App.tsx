import React, { Component } from 'react';
import AppRouter from "./AppRouter";
import {IStore, IUser} from "./models";
import {connect} from "react-redux";

interface IReduxProps {
    user?: Partial<IUser>;
}

// material ui version 3.6.2
class App extends React.PureComponent <IReduxProps> {

    render() {
        const {user} = this.props;
        return (
            <AppRouter user={user}/>
        );
  }
}

const mapStateToProps = (store: IStore) => ({
    user: store.user,
});


export default connect(mapStateToProps, null)(App as any);
