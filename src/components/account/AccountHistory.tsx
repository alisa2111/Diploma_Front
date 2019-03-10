import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {IAccount, IStore, ITableRow} from "../../models";
import {bindActionCreators} from "redux";
import {getAllMoneyFlows} from "../../redux/moneyFlow/actions";
import {CircularProgress} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import _ from "lodash";

interface IReduxProps {
    moneyFlows: any,
    account: Partial<IAccount>,
    getAllMoneyFlows: (accountId: string) => void,
}

interface IState {
    order: any,
    orderBy: string,
}

class AccountHistory extends React.PureComponent <IReduxProps, IState> {

    constructor(props: IReduxProps){
        super(props);
        this.state = {
            order: "asc",
            orderBy: "amount"
        }
    }

    componentWillMount(){
        if (this.props.account && this.props.account.id) {
            this.props.getAllMoneyFlows(this.props.account.id);
        }
    }

    render() {
        const {moneyFlows} = this.props;
        const {order, orderBy} = this.state;
        const headerData = [
            { id: 'type', label: 'Тип' },
            { id: 'category', label: 'Категория расхода' },
            { id: 'source', label: 'Куда/Откуда' },
            { id: 'amount', label: 'Сумма' },
            { id: 'comment', label: 'Комментарий' },
            { id: 'date', label: 'Дата' },
        ];

        if(!moneyFlows) {
            return <CircularProgress style={styles.spinner}/>
        } else {
            console.log(moneyFlows)
            const tableData = _.map(moneyFlows,(moneyFlow: any) => ({
                type: moneyFlow.type === "expense" ? "Расход" : "Доход",
                category: moneyFlow.category[0] ? moneyFlow.category[0].title : "-", // if income?
                source: moneyFlow.source[0].title,
                amount: moneyFlow.amount,
                comment: moneyFlow.comment,
                date: moneyFlow.createdAt,
            }));

            return (
                <Paper>
                    <Table>

                        <TableHead>
                            <TableRow>
                                {headerData.map(row => <RenderRow row={row} orderBy={orderBy} order={order} sortHandler={this.sortHandler}/>)}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.stableSort(tableData, this.getSorting(order, orderBy))
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow key={`row-${index}`}>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.source}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>{row.comment}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>

                    </Table>
                </Paper>
            )
        }
    }

    private sortHandler = (property: any) => () => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    private desc = (a:any, b:any, orderBy:any) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    private stableSort = (array:any, cmp:any) => {
        const stabilizedThis = array.map((el:any, index:any) => [el, index]);
        stabilizedThis.sort((a:any, b:any) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el:any) => el[0]);
    };

    private getSorting = (order:any, orderBy:any) => {
        return order === 'desc' ? (a:any, b:any) => this.desc(a, b, orderBy) : (a:any, b: any) => -this.desc(a, b, orderBy);
    };
}

const RenderRow = (props: any) => {
    const {row, orderBy, order, sortHandler} = props;
  return (
      <TableCell sortDirection={order}>
          <Tooltip title={"Сортировка"}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountHistory);