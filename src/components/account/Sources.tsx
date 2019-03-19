import React, {Component} from 'react';
import {IAccount, ISource, IStore,} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getSources} from "../../redux/sources/actions";
import IconWrapper from "../icons/IconWrapper";
import AddMoneyFlowModal from "./AddMoneyFlowModal";
import {CircularProgress} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import _ from "lodash";

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
            <div style={styles.sourceSection}>
                <h2>Ваш бумажник</h2>
                <div style={styles.container}>
                    {
                        sources &&
                            _.map(sources, source => {
                            return (
                                <div style={styles.sourceRow} key={source.id}>
                                    <div>
                                        <IconWrapper icon={source.type === "cash" ? "wallet" : "creditCard"}/>
                                        <span key={source.title}>{source.title}: {source.balance}</span>
                                    </div>
                                    <IconButton onClick={this.handleOpenModal(source.id)}>
                                        <AddCircle style={styles.addCircleIcon}/>
                                    </IconButton>
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
            </div>
        );
    }

    private handleOpenModal = (sourceId: string) => () => this.setState({modalOpen: true, sourceId});

    private handleModalClose = () => this.setState({modalOpen: false, sourceId: ""});
}

const styles = ({
    container: {
        boxShadow: " 0 0 10px rgba(0,0,0,0.5)",
        padding: "7px",
        minWidth: "300px"
    },
    sourceSection: {
        marginLeft: "25px",
    },
    addCircleIcon: {
        fontSize: "25px",
        color: "green",
    },
    sourceRow: {
        display: "flex",
        justifyContent: "space-between",
    }
});

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    sources: store.sources,
});

const mapDispatchToProps = (dispatch: any) => ({
    onFetchSources: bindActionCreators(accountId => getSources(accountId), dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Sources as any);
