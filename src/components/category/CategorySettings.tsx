import React from 'react';
import {IAccount, ICategory, IStore} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCategories} from "../../redux/category/actions";
import {CircularProgress} from "@material-ui/core";
import CategoryRow from "./CategoryRow";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import classNames from "classnames";
import CategoryTemplate from "./CategoryTemplate";

interface IReduxProps {
    account: IAccount
    categories: ICategory[]
    onFetchCategories: (accountId: string) => void;
}

interface IProps extends IReduxProps {
    classes: {
        div: string,
        categoryTable: string,
        categoryTemplate: string
    }
}

interface IState {
    category: ICategory | null
}

class CategorySettings extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            category: null
        };
    }

    componentWillMount() {
        this.props.onFetchCategories(this.props.account.id);
    }

    render() {
        const {categories, account, classes} = this.props;
        if (!(categories && account)) return(<CircularProgress/>);
        const {category} = this.state;
        return(
            <div style={{display: 'flex'}}>
                <div className={classNames(classes.categoryTable, [classes.div])}>
                    <h2>Ваши категории:</h2>
                    {categories.map(category => <CategoryRow
                        key={category.id}
                        category={category}
                        onChooseCategory={this.handleChooseCategory(category)}
                        // todo: add transfer expenses from category should be deleted to other one
                        onDeleteCategory={(e: any) => {
                            console.log('modal about deleting category');
                            e.stopPropagation();
                        }}
                    />)}
                </div>
                <div className={classNames(classes.categoryTemplate, [classes.div])}>
                    <CategoryTemplate accountId={account.id} category={category}/>
                </div>
            </div>
        );
    }

    private handleChooseCategory = (category: ICategory) => () => this.setState({category: category});
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    categories: store.categories,
});

const mapDispatchToProps = (dispatch: any) => ({
    onFetchCategories: bindActionCreators(accountId => getCategories(accountId), dispatch),
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
        marginLeft: "15%"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategorySettings as any));