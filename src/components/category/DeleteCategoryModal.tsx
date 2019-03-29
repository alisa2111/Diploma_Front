import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Select,
    MenuItem,
} from "@material-ui/core";
import _ from "lodash";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {checkCategory, deleteCategory, setCategoryCheckResultToStore} from "../../redux/category/actions";
import {ICategory} from "../../models";
import Spinner from "../common/Spinner";

interface IReduxProps {
    onCheckCategory: (categoryId: string) => void;
    onDeleteCategory: (categoryId: string, replaceTo: string | null) => void;
    onUnmount: () => void;
}

interface IProps extends IReduxProps {
    open: boolean
    category: ICategory
    categoryConnected: boolean | null
    categories: ICategory[]
    onModalClose: () => void;
}

interface IState {
    category: ICategory
    checkingInProgress: boolean
    categoryConnected: boolean
    replaceTo: string | null
    categoriesForReplace: ICategory[]
}

class DeleteCategoryModal extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            category: props.category,
            checkingInProgress: false,
            categoryConnected: false,
            replaceTo: null,
            categoriesForReplace: []
        };
    };

    componentWillMount() {
        const {props} = this;
        const categoryIdToDelete = props.category.id;
        this.props.onCheckCategory(categoryIdToDelete);
        this.setState({
            category: props.category,
            checkingInProgress: true,
            categoriesForReplace: _.filter(props.categories, c => c.id !== categoryIdToDelete),
            replaceTo: null
        });
    }

    componentWillReceiveProps(nextProps: Readonly<IProps>) {
        const {categoriesForReplace} = this.state;
        this.setState({
            checkingInProgress: false,
            categoryConnected: !!nextProps.categoryConnected,
            replaceTo: _.isEmpty(categoriesForReplace) ? null : categoriesForReplace[0].id
        });
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        const {open, onModalClose} = this.props;
        return (
            <Dialog open={open} onClose={onModalClose}>
                {this.getDialogBody()}
            </Dialog>
        );
    }

    private getDialogBody = () => {
        const {category, categoryConnected, checkingInProgress, categoriesForReplace, replaceTo} = this.state;
        if (checkingInProgress) {
            return (<Spinner/>);
        }
        return (
            <React.Fragment>
                <DialogTitle>Вы уверены, что хотите удалить категорию <strong>'{category.title}'</strong>?</DialogTitle>
                {
                    categoryConnected ?
                        _.isEmpty(categoriesForReplace) ?
                            <DialogContent><p>Должна быть как минимум одна категория в аккаунте!</p></DialogContent> :
                            <DialogContent>
                                <p>У категории <strong>'{category.title}'</strong> есть расходы. Выберите категорию для замены:
                                </p>
                                <FormControl>
                                    <Select
                                        value={replaceTo ? replaceTo : categoriesForReplace[0].id}
                                        onChange={this.handleReplaceToValueChange}
                                    >
                                        {categoriesForReplace.map(c => <MenuItem key={c.id}
                                                                                 value={c.id}>{c.title}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </DialogContent>
                        : null
                }
                <DialogActions>
                    {
                        ((categoryConnected && !_.isEmpty(categoriesForReplace)) || !categoryConnected) &&
                        <Button onClick={this.handleDeleteCategory} variant="contained" color="secondary">
                            Да
                        </Button>
                    }
                    <Button onClick={this.props.onModalClose} color="primary" variant="contained">
                        Отмена
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    };

    private handleReplaceToValueChange = (e: any) => this.setState({replaceTo: e.target.value});

    private handleDeleteCategory = () => {
        const {category, replaceTo} = this.state;
        this.props.onDeleteCategory(category.id, replaceTo);
        this.props.onModalClose();
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    onCheckCategory: bindActionCreators((categoryId) => checkCategory(categoryId), dispatch),
    onDeleteCategory: bindActionCreators((categoryId, replaceTo) => deleteCategory(categoryId, replaceTo), dispatch),
    onUnmount: bindActionCreators(() => setCategoryCheckResultToStore(null), dispatch)
});

export default connect(null, mapDispatchToProps)(DeleteCategoryModal);