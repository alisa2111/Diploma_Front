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
import {ISource} from "../../models";
import {checkSource, deleteSource} from "../../redux/sources/actions";

interface IReduxProps {
    onCheckSource: (sourceId: string) => void;
    onDeleteSource: (sourceId: string, replaceTo: string | null) => void;
}

interface IProps extends IReduxProps {
    open: boolean
    sourceId: string
    title: string
    sourceConnected: boolean,
    sources: ISource[]
    onModalClose: () => void;
}

interface IState {
    sourceId: string
    checkingInProgress: boolean
    sourceConnected: boolean | null
    title: string
    replaceTo: string | null
    sourcesForReplace: ISource[]
}

class DeleteSourceModal extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            sourceId: "",
            checkingInProgress: false,
            sourceConnected: false,
            title: "",
            replaceTo: null,
            sourcesForReplace: []
        };
    };

    componentWillReceiveProps(nextProps: Readonly<IProps>) {
        const currentSourceId = this.state.sourceId;
        if (!_.isEmpty(currentSourceId) && nextProps.sourceId === currentSourceId) {
            this.setState({
                sourceConnected: nextProps.sourceConnected,
                replaceTo: nextProps.sourceConnected ? this.state.sourcesForReplace[0].id : null,
                checkingInProgress: false
            });
        } else {
            let checkingInProgress = false;
            if (!_.isEmpty(nextProps.sourceId)) {
                this.props.onCheckSource(nextProps.sourceId);
                checkingInProgress = true;
            }
            this.setState({
                sourceId: nextProps.sourceId,
                title: nextProps.title,
                sourceConnected: null,
                checkingInProgress: checkingInProgress,
                sourcesForReplace: _.filter(nextProps.sources, c => c.id !== nextProps.sourceId)
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
        const {title, sourceConnected, checkingInProgress, replaceTo, sourcesForReplace} = this.state;
        if (checkingInProgress) {
            return (<CircularProgress/>);
        }
        return (
            <React.Fragment>
                <DialogTitle>Вы уверены, что хотите удалить категорию <strong>'{title}'</strong>?</DialogTitle>
                {
                    sourceConnected &&
                    <DialogContent>
                        <p>У категории <strong>'{title}'</strong> есть расходы. Выберите категорию для замены:</p>
                        <FormControl>
                            <Select
                                value={replaceTo ? replaceTo : ""}
                                onChange={this.handleReplaceToValueChange}
                            >
                                {sourcesForReplace.map(c => <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </DialogContent>
                }
                <DialogActions>
                    <Button onClick={this.handleDeleteSource} variant="contained" color="secondary">
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

    private handleDeleteSource = () => {
        const {sourceId, replaceTo} = this.state;
        this.props.onDeleteSource(sourceId, replaceTo);
        this.handleModalClose();
    };

    private handleModalClose = () => {
        this.setState({replaceTo: null});
        this.props.onModalClose();
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    onCheckSource: bindActionCreators((sourceId) => checkSource(sourceId), dispatch),
    onDeleteSource: bindActionCreators((sourceId, replaceTo) => deleteSource(sourceId, replaceTo), dispatch)
});

export default connect(null, mapDispatchToProps)(DeleteSourceModal);