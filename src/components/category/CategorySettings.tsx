import React from 'react';
import {IAccount, ICategory, IStore} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCategories} from "../../redux/category/actions";
import {CircularProgress} from "@material-ui/core";
import CategoryRow from "./CategoryRow";

interface IReduxProps {
    account: IAccount
    categories: ICategory[]
    onFetchCategories: (accountId: string) => void;
}

class CategorySettings extends React.PureComponent<IReduxProps, {}> {

    componentWillMount() {
        this.props.onFetchCategories(this.props.account.id);
    }

    render() {
        const {categories, account} = this.props;
        if (!(categories && account)) return(<CircularProgress/>);
        return(
                <div style={styles.categoryTable}>
                    <h2>Ваши категории:</h2>
                    {categories.map(category => <CategoryRow key={category.id} category={category}/>)}
                </div>
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    account: store.account,
    categories: store.categories,
});

const mapDispatchToProps = (dispatch: any) => ({
    onFetchCategories: bindActionCreators(accountId => getCategories(accountId), dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(CategorySettings as any);

const styles = ({
    categoryTable: {
        width: "35%",
        padding: "4px"
    }
});