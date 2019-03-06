import React, {Component} from 'react';
import {IAccount, ISource, IStore,} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getSources} from "../../redux/sources/actions";

// material ui version 3.6.2

interface IReduxProps {
    account: IAccount;
    sources: ISource[];
    onFetchIncome: (accountId: string) => void;
}

class Sources extends React.PureComponent <IReduxProps> {

    componentWillMount(){
        this.props.onFetchIncome(this.props.account.id);
    }

    render() {
        const {sources} = this.props;
        return (
            <div>
                {sources && sources.map(inc => <p>{inc.title}: {inc.balance}</p>)}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    sources: store.sources,
});

const mapDispatchToProps = (dispatch: any) => ({
    onFetchIncome: bindActionCreators(accountId => getSources(accountId), dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Sources as any);
