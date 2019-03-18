import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {IAccount, ICategory, ISource, IStore} from "../../models";
import {bindActionCreators} from "redux";
import {onFilterChange} from "../../redux/moneyFlow/actions";
import {connect} from "react-redux";
import {getCategories} from "../../redux/category/actions";
import _ from "lodash";
import {getSources} from "../../redux/sources/actions";

interface ISelectOption {
    value: string;
    label: string;
}

interface IFieldProps extends ISelectOption {
    options: ISelectOption[];
    onChange: (event: any) => void;
}

export interface IFilterableFields {
    type: string;
    categoryId: string;
    sourceId: string;
    startDate: string;
    endDate: string;
}

interface IReduxProps {
    account: Partial<IAccount>,
    categories: ICategory[],
    sources: ISource[],

    onFilterChange: (filterableFields: IFilterableFields) => void;
    getAllCategories: (accountId: string) => void;
    getAllSources: (accountId: string) => void;
}

interface IState {
    filterableFields: IFilterableFields,
}

class HistoryFilter extends React.PureComponent <IReduxProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            filterableFields: {
                type: "all",
                categoryId: "all",
                sourceId: "all",
                startDate: "all",
                endDate: "all",
            },
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
            {value: "expense", label: "Расход"},
            {value: "income", label: "Доход"},
            {value: "all", label: "Все"}
        ];

        const categoryOptions = _.map(this.props.categories, category => ({
            value: category.id,
            label: category.title,
        }));
        categoryOptions.push({value: "all", label: "Все"});

        const sourceOptions = _.map(this.props.sources, source => ({
            value: source.id,
            label: source.title,
        }));
        sourceOptions.push({value: "all", label: "Все"});

        return (
            <div style={styles.filterContainer}>
                <SelectField
                    label="Тип"
                    options={typeOptions}
                    value={this.state.filterableFields.type }
                    onChange={this.handleChange("type")}
                />

                <SelectField
                    label="Категория"
                    options={categoryOptions}
                    value={this.state.filterableFields.categoryId}
                    onChange={this.handleChange("categoryId")}
                />

                <SelectField
                    label="Куда/Откуда"
                    options={sourceOptions}
                    value={this.state.filterableFields.sourceId}
                    onChange={this.handleChange("sourceId")}
                />

                <form style={styles.form}>
                    <TextField
                        id="date"
                        label="Начиная с:"
                        type="date"
                        onChange={this.handleChange("startDate")}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="date"
                        label="Заканчивая:"
                        type="date"
                        onChange={this.handleChange("endDate")}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>

            </div>
        )
    }

    private handleChange = (field: string) => (event: any) => {
        const clonedFilterableFields = _.clone(this.state.filterableFields);
        this.setState({
                filterableFields: _.assign(clonedFilterableFields, {[field]: event.target.value})
            },
            () => this.props.onFilterChange(this.state.filterableFields));
    };
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
        minWidth: "15%",
    },
    form: {
        margin: "20px 0 0 25px",
    },
    filterContainer: {
        display: "flex",
    }
};

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    categories: store.categories,
    sources: store.sources,
});

const mapDispatchToProps = (dispatch: any) => ({
    onFilterChange: bindActionCreators((filterableFields) => onFilterChange(filterableFields), dispatch),
    getAllCategories: bindActionCreators(accountId => getCategories(accountId), dispatch),
    getAllSources: bindActionCreators(accountId => getSources(accountId), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryFilter as any);