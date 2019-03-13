import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {IAccount, ICategory, ISource, IStore} from "../../models";
import {bindActionCreators} from "redux";
import {getAllMoneyFlows} from "../../redux/moneyFlow/actions";
import {CircularProgress} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import _ from "lodash";
import * as moment from 'moment';
import TablePagination from '@material-ui/core/TablePagination';

enum sortOrder {
    asc = "asc",
    desc = "desc"
}

interface IRow {
    type: string;
    category: string;
    source: string;
    amount: number;
    comment: string;
    createdAt: string;
}

interface IHeaderRow {
    id: string;
    label: string;
}

interface ITableMoneyFlow {
    type: string;
    category: ICategory[];
    source: ISource[];
    amount: number;
    comment: string;
    createdAt: Date;
}

interface IReduxProps {
    moneyFlows: ITableMoneyFlow[],
    account: Partial<IAccount>,
    getAllMoneyFlows: (accountId: string) => void,
}

interface IState {
    order: sortOrder,
    orderBy: string,
    page: number,
    rowsPerPage: number
}

class AccountHistory extends React.PureComponent <IReduxProps, IState> {

    constructor(props: IReduxProps) {
        super(props);
        this.state = {
            order: sortOrder.desc,
            orderBy: "createdAt",
            page: 0,
            rowsPerPage: 10,
        }
    }

    componentWillMount() {
        const {account, getAllMoneyFlows} = this.props;
        if (account && account.id) {
            getAllMoneyFlows(account.id);
        }
    }

    render() {
        const {moneyFlows} = this.props;
        const {order, orderBy, page, rowsPerPage} = this.state;
        const headerData = [
            {id: 'type', label: 'Тип'},
            {id: 'category', label: 'Категория расхода'},
            {id: 'source', label: 'Куда/Откуда'},
            {id: 'amount', label: 'Сумма'},
            {id: 'comment', label: 'Комментарий'},
            {id: "createdAt", label: 'Дата'},
        ];

        if (!moneyFlows) {
            return <CircularProgress style={styles.spinner}/>
        } else {
            const tableData = _.map(moneyFlows, (moneyFlow: ITableMoneyFlow) => ({
                type: moneyFlow.type === "expense" ? "Расход" : "Доход",
                category: moneyFlow.category[0] ? moneyFlow.category[0].title : "-",
                source: moneyFlow.source[0].title,
                amount: moneyFlow.amount,
                comment: moneyFlow.comment,
                createdAt: moment.utc(moneyFlow.createdAt).format("DD.MM.YYYY"),
            }));

            return (
                <Paper>
                    <div>
                        <Table>

                            <TableHead>
                                <TableRow>
                                    {headerData.map((row, index) =>
                                        <RenderRow
                                            key={`row-${index}`}
                                            row={row}
                                            orderBy={orderBy}
                                            order={order}
                                            sortHandler={this.sortHandler}
                                        />)}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {this.stableSort(tableData, this.getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: IRow, index: number) => {
                                        return (
                                            <TableRow key={`row-${index}`}>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell>{row.category}</TableCell>
                                                <TableCell>{row.source}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell>{row.comment}</TableCell>
                                                <TableCell>{row.createdAt}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>

                        </Table>
                    </div>

                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={moneyFlows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
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

    private sortHandler = (property: string) => () => {
        const orderBy = property;
        let order = sortOrder.desc;

        if (this.state.orderBy === property && this.state.order === sortOrder.desc) {
            order = sortOrder.asc;
        }

        this.setState({order, orderBy});
    };

    private desc = (a: any, b: any, orderBy: string) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    private stableSort = (array: IRow[], cmp: any) => {
        const stabilizedThis = array.map((el: any, index: any) => [el, index]);
        stabilizedThis.sort((a: any, b: any) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el: IRow[]) => el[0]);
    };

    private getSorting = (order: sortOrder, orderBy: string) => {
        return order === sortOrder.desc ? (a: any, b: any) => this.desc(a, b, orderBy) : (a: any, b: any) => -this.desc(a, b, orderBy);
    };
}

const RenderRow = (props: { row: IHeaderRow, orderBy: string, order: sortOrder, sortHandler: Function }) => {
    const {row, orderBy, order, sortHandler} = props;
    return (
        <TableCell sortDirection={order}>
            <Tooltip title={"Сортировать"}>
                <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={sortHandler(row.id)}
                >
                    {row.label}
                </TableSortLabel>
            </Tooltip>
        </TableCell>
    )
};

const styles = {
    spinner: {
        margin: "50px 0 0 45%",
    }
};

const mapStateToProps = (store: IStore) => ({
    moneyFlows: store.moneyFlows,
    account: store.account,
});

const mapDispatchToProps = (dispatch: any) => ({
    getAllMoneyFlows: bindActionCreators(accountId => getAllMoneyFlows(accountId), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountHistory as any);