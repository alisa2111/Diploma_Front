import React from 'react';
import _ from 'lodash';
import {IAccount, ISource, IStore} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {CircularProgress} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import classNames from "classnames";
import {getSources} from "../../redux/sources/actions";
import SourceRow from "./SourceRow";
import SourceTemplate from "./SourceTemplate";
import DeleteSourceModal from "./DeleteSourceModal";

interface IReduxProps {
    account: IAccount
    sources: ISource[]
    sourceConnected: boolean
    onFetchSources: (accountId: string) => void;
}

interface IProps extends IReduxProps {
    classes: {
        div: string,
        categoryTable: string,
        categoryTemplate: string
    }
}

interface IState {
    source: ISource | null
    deleteModalOpen: boolean
}

class SourceSettings extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            source: null,
            deleteModalOpen: false
        };
    }

    componentWillMount() {
        if (_.isEmpty(this.props.sources)) {
            this.props.onFetchSources(this.props.account.id);
        }
    }

    render() {
        const {sources, account, classes, sourceConnected} = this.props;
        if (!(sources && account)) return(<CircularProgress/>);
        const {source, deleteModalOpen} = this.state;
        return(
            <div style={{display: 'flex'}}>
                <div className={classNames(classes.categoryTable, [classes.div])}>
                    <h2>Ваш бумажник:</h2>
                    {sources.map(source => <SourceRow
                        key={source.id}
                        source={source}
                        onChooseSource={this.handleChooseSource(source)}
                        onDeleteSource={this.handleDeleteSourceModalOpen(source)}
                    />)}
                </div>
                <div className={classNames(classes.categoryTemplate, [classes.div])}>
                    <SourceTemplate accountId={account.id} source={source}/>
                </div>
                <DeleteSourceModal
                    open={deleteModalOpen}
                    sourceId={source ? source.id : ""}
                    title={source ? source.title : ""}
                    sources={sources}
                    sourceConnected={sourceConnected}
                    onModalClose={this.handleDeleteSourceModalClose}
                />
            </div>
        );
    }

    private handleChooseSource = (source: ISource) => () => this.setState({source: source});

    private handleDeleteSourceModalOpen = (source: ISource) => (e: any) => {
        e.stopPropagation();
        this.setState({
            source: source,
            deleteModalOpen: true
        });
    };

    private handleDeleteSourceModalClose = () => this.setState({source: null, deleteModalOpen: false});
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    sources: store.sources,
    sourceConnected: store.sourceConnected
});

const mapDispatchToProps = (dispatch: any) => ({
    onFetchSources: bindActionCreators(accountId => getSources(accountId), dispatch),
});


const styles = createStyles({
    div: {
        display: 'inline-block'
    },
    categoryTable: {
        width: "35%",
        padding: "4px"
    },
    categoryTemplate: {
        marginLeft: "15%",
        marginTop: "22px",
        width: "35%"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SourceSettings as any));