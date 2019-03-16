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
    CircularProgress
} from "@material-ui/core";
import _ from "lodash";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {checkCategory, deleteCategory} from "../../redux/category/actions";
import {ICategory} from "../../models";

interface IReduxProps {
    onCheckCategory: (categoryId: string) => void;
    onDeleteCategory: (categoryId: string, replaceTo: string | null) => void;
}

interface IProps extends IReduxProps {
    open: boolean
    categoryId: string
    title: string
    categoryConnected: boolean,
    categories: ICategory[]
    onModalClose: () => void;
}

interface IState {
    categoryId: string
    checkingInProgress: boolean
    categoryConnected: boolean | null
    title: string
    replaceTo: string | null
    categoriesForReplace: ICategory[]
}

class DeleteCategoryModal extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            categoryId: "",
            checkingInProgress: false,
            categoryConnected: false,
            title: "",
            replaceTo: null,
            categoriesForReplace: []
        };
    };

    componentWillReceiveProps(nextProps: Readonly<IProps>) {
        const currentCategoryId = this.state.categoryId;
        if (!_.isEmpty(currentCategoryId) && nextProps.categoryId === currentCategoryId) {
            this.setState({
                categoryConnected: nextProps.categoryConnected,
                replaceTo: nextProps.categoryConnected ? this.state.categoriesForReplace[0].id : null,
                checkingInProgress: false
            });
        } else {
            this.props.onCheckCategory(nextProps.categoryId);
            this.setState({
                categoryId: nextProps.categoryId,
                title: nextProps.title,
                categoryConnected: null,
                checkingInProgress: true,
                categoriesForReplace: _.filter(nextProps.categories, c => c.id !== nextProps.categoryId)
            });
        }
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
        const {title, categoryConnected, checkingInProgress, replaceTo, categoriesForReplace} = this.state;
        if (checkingInProgress) {
            return (<CircularProgress/>);
        }
        return (
            <React.Fragment>
                <DialogTitle>Вы уверены, что хотите удалить категорию <strong>'{title}'</strong>?</DialogTitle>
                {
                    categoryConnected &&
                    <DialogContent>
                        <p>У категории <strong>'{title}'</strong> есть расходы. Выберите категорию для замены:</p>
                        <FormControl>
                            <Select
                                value={replaceTo ? replaceTo : ""}
                                onChange={this.handleReplaceToValueChange}
                            >
                                {categoriesForReplace.map(c => <MenuItem key={c.id}
                                                                         value={c.id}>{c.title}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </DialogContent>
                }
                <DialogActions>
                    <Button
                        onClick={this.handleDeleteCategory} variant="contained" color="secondary">
                        Да
                    </Button>
                    <Button onClick={this.handleModalClose} color="primary" variant="contained">
                        Отмена
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    };

    private handleReplaceToValueChange = (e: any) => this.setState({replaceTo: e.target.value});

    private handleDeleteCategory = () => {
        const {categoryId, replaceTo} = this.state;
        this.props.onDeleteCategory(categoryId, replaceTo);
        this.handleModalClose();
    };

    private handleModalClose = () => {
        this.setState({replaceTo: null});
        this.props.onModalClose();
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    onCheckCategory: bindActionCreators((categoryId) => checkCategory(categoryId), dispatch),
    onDeleteCategory: bindActionCreators((categoryId, replaceTo) => deleteCategory(categoryId, replaceTo), dispatch)
});

export default connect(null, mapDispatchToProps)(DeleteCategoryModal);