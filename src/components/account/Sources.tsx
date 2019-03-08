import React, {Component} from 'react';
import {IAccount, ISource, IStore,} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getSources} from "../../redux/sources/actions";

// material ui version 3.6.2

interface IReduxProps {
    account: IAccount;
    sources: ISource[];
    onFetchSources: (accountId: string) => void;
}

class Sources extends React.PureComponent <IReduxProps> {

    componentWillMount(){
        this.props.onFetchSources(this.props.account.id);
    }

    render() {
        const {sources} = this.props;
        return (
            <div>
                {sources && sources.map(source => <p key={source.title}>{source.title}: {source.balance}</p>)}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    sources: store.sources,
});

const mapDispatchToProps = (dispatch: any) => ({
    onFetchSources: bindActionCreators(accountId => getSources(accountId), dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Sources as any);
