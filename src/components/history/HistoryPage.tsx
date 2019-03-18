import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {IStore, ITableMoneyFlow} from "../../models";
import {bindActionCreators} from "redux";
import {getAllMoneyFlows} from "../../redux/moneyFlow/actions";
import {CircularProgress} from "@material-ui/core";
import _ from "lodash";
import TablePagination from '@material-ui/core/TablePagination';
import HistoryFilter from "./HistoryFilter";
import * as moment from "moment";
import HistoryTable from "./HistoryTable";

interface IReduxProps {
    moneyFlows: ITableMoneyFlow[];
    getAllMoneyFlows: () => void,
}

interface IState {
    page: number,
    rowsPerPage: number
}

class HistoryPage extends React.PureComponent <IReduxProps, IState> {

    constructor(props: IReduxProps) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
        }
    }

    componentWillMount() {
        this.props.getAllMoneyFlows();
    }

    render() {
        const {moneyFlows} = this.props;
        const {page, rowsPerPage} = this.state;
        const tableData = _.map(moneyFlows, moneyFlow => ({
            type: moneyFlow.type === "expense" ? "Расход" : "Доход",
            category: moneyFlow.category[0] ? moneyFlow.category[0].title : "-",
            source: moneyFlow.source[0].title,
            amount: moneyFlow.amount,
            comment: moneyFlow.comment,
            createdAt: moment.utc(moneyFlow.createdAt).format("DD.MM.YYYY"),
        }));

        if (!tableData) {
            return <CircularProgress style={styles.spinner}/>
        } else {
            return (
                <Paper>
                    <HistoryFilter/>
                    <HistoryTable
                        tableData={tableData}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            )
        }
    }

    private handleChangePage = (event: any, page: number) => this.setState({page});
    private handleChangeRowsPerPage = (event: any) => this.setState({rowsPerPage: event.target.value});

}

const styles = {
    spinner: {
        margin: "50px 0 0 45%",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        margin: "0 25px",
    }
};

const mapStateToProps = (store: IStore) => ({
    moneyFlows: store.moneyFlows,
});

const mapDispatchToProps = (dispatch: any) => ({
    getAllMoneyFlows: bindActionCreators(() => getAllMoneyFlows(), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage as any);