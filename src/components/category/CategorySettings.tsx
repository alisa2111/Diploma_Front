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
import DeleteCategoryModal from '../category/DeleteCategoryModal';

interface IReduxProps {
    account: IAccount
    categories: ICategory[]
    categoryConnected: boolean
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
    deleteModalOpen: boolean
}

class CategorySettings extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            category: null,
            deleteModalOpen: false
        };
    }

    componentWillMount() {
        this.props.onFetchCategories(this.props.account.id);
    }

    componentWillReceiveProps (nextProps: IReduxProps) {
        if (this.props.account.id !== nextProps.account.id) {
            this.props.onFetchCategories(nextProps.account.id);
        }
    }

    render() {
        const {categories, categoryConnected, account, classes} = this.props;
        if (!(categories && account)) return(<CircularProgress/>);
        const {category, deleteModalOpen} = this.state;
        return(
            <div style={{display: 'flex'}}>
                <div className={classNames(classes.categoryTable, [classes.div])}>
                    <h2>Ваши категории:</h2>
                    {categories.map(category => <CategoryRow
                        key={category.id}
                        category={category}
                        onChooseCategory={this.handleChooseCategory(category)}
                        onDeleteCategory={this.handleDeleteCategoryModalOpen(category)}
                    />)}
                </div>
                <div className={classNames(classes.categoryTemplate, [classes.div])}>
                    <CategoryTemplate accountId={account.id} category={category}/>
                </div>
                <DeleteCategoryModal
                    open={deleteModalOpen}
                    categoryId={category ? category.id : ""}
                    title={category ? category.title : ""}
                    categoryConnected={categoryConnected}
                    categories={categories}
                    onModalClose={this.handleDeleteCategoryModalClose}
                />
            </div>
        );
    }

    private handleChooseCategory = (category: ICategory) => () => this.setState({category: category});

    private handleDeleteCategoryModalOpen = (category: ICategory) => (e: any) => {
        e.stopPropagation();
        this.setState({
            category: category,
            deleteModalOpen: true
        });
    };

    private handleDeleteCategoryModalClose = () => this.setState({category: null, deleteModalOpen: false});
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    categories: store.categories,
    categoryConnected: store.categoryConnected,
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