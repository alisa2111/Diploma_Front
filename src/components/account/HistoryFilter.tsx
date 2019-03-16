import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {IAccount, ICategory, ISource, IStore, ITableData} from "../../models";
import {bindActionCreators} from "redux";
import {setTableData} from "../../redux/moneyFlow/actions";
import {connect} from "react-redux";
import {getCategories} from "../../redux/category/actions";
import _ from "lodash";
import {getSources} from "../../redux/sources/actions";

interface ISelectOption {
    value: string;
    label: string;
}

interface IFieldProps {
    label: string;
    value: string;
    options: ISelectOption[];
    onChange: (event: any) => void;
}

interface IReduxProps {
    account: Partial<IAccount>,
    categories: ICategory[],
    sources: ISource[],
    moneyFlows: ITableData[];

    setTableData: (tableData: ITableData[]) => void;
    getAllCategories: (accountId: string) => void;
    getAllSources: (accountId: string) => void;
}

class HistoryFilter extends React.PureComponent <IReduxProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            type: "all",
            categoryTitle: "all",
            sourceTitle: "all"
        };
    };

    componentWillMount() {
        const {account, getAllCategories, getAllSources} = this.props;
        if (account && account.id) {
            getAllCategories(account.id);
            getAllSources(account.id);
        }
    }

    render() {
        const typeOptions = [
            {value: "Расход", label: "Расход"},
            {value: "Доход", label: "Доход"},
            {value: "all", label: "Все"}
        ];

        const categoryOptions = _.map(this.props.categories, category => ({
            value: category.title,
            label: category.title,
        }));
        categoryOptions.push({value: "all", label: "Все"});

        const sourceOptions = _.map(this.props.sources, source => ({
            value: source.title,
            label: source.title,
        }));
        sourceOptions.push({value: "all", label: "Все"});

        return (
            <div>
                <SelectField
                    label="Тип"
                    options={typeOptions}
                    value={this.state.type}
                    onChange={this.handleChange("type")}
                />

                <SelectField
                    label="Категория"
                    options={categoryOptions}
                    value={this.state.categoryTitle}
                    onChange={this.handleChange("categoryTitle")}
                />

                <SelectField
                    label="Куда/Откуда"
                    options={sourceOptions}
                    value={this.state.sourceTitle}
                    onChange={this.handleChange("sourceTitle")}
                />

            </div>
        )
    }

    private handleChange = (field: string) => (event: any) =>
        this.setState({[field]: event.target.value}, () => this.handleFilter());


    private handleFilter = () => {
        const {moneyFlows, setTableData} = this.props;
        const {type, categoryTitle, sourceTitle} = this.state;
        const filteredTableData =
            moneyFlows
                .filter((data: ITableData) => type === "all" ? data : type === data.type)
                .filter((data: ITableData) => categoryTitle === "all" ? data : categoryTitle === data.categoryTitle)
                .filter((data: ITableData) => sourceTitle === "all" ? data : sourceTitle === data.sourceTitle);

        setTableData(filteredTableData);
    }
}

const SelectField = (props: IFieldProps) => {
    const {label, options, value, onChange} = props;
    return (
        <TextField
            select
            label={label}
            value={value}
            style={styles.field}
            onChange={onChange}
            margin="normal"
            variant="outlined"
        >
            {options.map((option: ISelectOption, index: number) => (
                <MenuItem key={`${option.label}-${index}`} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
};

const styles = {
    field: {
        marginLeft: "25px",
    }
};

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    moneyFlows: store.moneyFlows,
    categories: store.categories,
    sources: store.sources,
});

const mapDispatchToProps = (dispatch: any) => ({
    setTableData: bindActionCreators(tableData => setTableData(tableData), dispatch),
    getAllCategories: bindActionCreators(accountId => getCategories(accountId), dispatch),
    getAllSources: bindActionCreators(accountId => getSources(accountId), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryFilter as any);