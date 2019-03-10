import React, {Component} from 'react';
import {IAccount, ISource, IStore,} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getSources} from "../../redux/sources/actions";
import IconWrapper from "../icons/IconWrapper";
import AddMoneyFlowModal from "./AddMoneyFlowModal";
import {CircularProgress} from "@material-ui/core";

const styles = ({
    container: {
        border: "1px solid black",
        padding: "7px",
        minWidth: "300px"
    },
});

// material ui version 3.6.2

interface IReduxProps {
    account: IAccount;
    sources: ISource[];
    onFetchSources: (accountId: string) => void;
}

interface IState {
    modalOpen: boolean
    sourceId: string
}

class Sources extends React.PureComponent <IReduxProps, IState> {

    constructor(props: IReduxProps) {
        super(props);
        this.state = {
            modalOpen: false,
            sourceId: ""
        }
    }

    componentWillMount(){
        this.props.onFetchSources(this.props.account.id);
    }

    render() {
        const {sources, account} = this.props;
        if (!(sources && account)) return (<CircularProgress/>);
        return (
            <div style={styles.container}>
                {
                    sources &&
                    sources.map(source => {
                        return (
                            <div key={source.id}>
                                <IconWrapper icon={source.type === "cash" ? "wallet" : "creditCard"}/>
                                <span key={source.title}>{source.title}: {source.balance}</span>
                                <IconWrapper icon={'addCircle'} handleClick={this.handleOpenModal(source.id)}/>
                            </div>
                        )
                    })
                }
                <AddMoneyFlowModal
                    open={this.state.modalOpen}
                    accountId={account.id}
                    type={"income"}
                    sourceId={this.state.sourceId}
                    onClose={this.handleModalClose}
                />
            </div>
        );
    }

    private handleOpenModal = (sourceId: string) => () => this.setState({modalOpen: true, sourceId});

    private handleModalClose = () => this.setState({modalOpen: false, sourceId: ""});
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    sources: store.sources,
});

const mapDispatchToProps = (dispatch: any) => ({
    onFetchSources: bindActionCreators(accountId => getSources(accountId), dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Sources as any);
