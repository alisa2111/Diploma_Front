import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import _ from "lodash";
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

enum sortOrder {
    asc = "asc",
    desc = "desc"
}

interface IHeaderRow {
    id: string;
    label: string;
}

interface ITableRow {
    type: string;
    category: string;
    source: string;
    amount: number;
    comment: string;
    date: string;
}

interface IProps {
    tableData: ITableRow[];
    page: number,
    rowsPerPage: number
}

interface IState {
    order: sortOrder,
    orderBy: string,
}

export default class HistoryTable extends React.PureComponent <IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            order: sortOrder.desc,
            orderBy: "date",
        }
    }

    render() {
        const {tableData, page, rowsPerPage} = this.props;
        const {order, orderBy} = this.state;
        const headerData = [
            {id: 'type', label: 'Тип'},
            {id: 'category', label: 'Категория расхода'},
            {id: 'source', label: 'Куда/Откуда'},
            {id: 'amount', label: 'Сумма'},
            {id: 'comment', label: 'Комментарий'},
            {id: "date", label: 'Дата'},
        ];
        return (
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
                        .map((row: ITableRow, index: number) => {
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
        )
    }

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

    private stableSort = (array: ITableRow[], cmp: any) => {
        const stabilizedThis = _.map(array, (el: any, index: any) => [el, index]);
        stabilizedThis.sort((a: any, b: any) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el: ITableRow[]) => el[0]);
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