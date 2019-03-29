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
import {ISource} from "../../models";
import {checkSource, deleteSource, setSourceCheckResultToStore} from "../../redux/sources/actions";
import Spinner from "../common/Spinner";

interface IReduxProps {
    onCheckSource: (sourceId: string) => void;
    onDeleteSource: (sourceId: string, replaceTo: string | null) => void;
    onUnmount: () => void;
}

interface IProps extends IReduxProps {
    open: boolean
    source: ISource
    sourceConnected: boolean | null,
    sources: ISource[]
    onModalClose: () => void;
}

interface IState {
    source: ISource
    checkingInProgress: boolean
    sourceConnected: boolean
    replaceTo: string | null
    sourcesForReplace: ISource[]
}

class DeleteSourceModal extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            source: props.source,
            checkingInProgress: false,
            sourceConnected: false,
            replaceTo: null,
            sourcesForReplace: []
        };
    };

    componentWillMount() {
        const {props} = this;
        const sourceIdToDelete = props.source.id;
        this.props.onCheckSource(sourceIdToDelete);
        this.setState({
            source: props.source,
            checkingInProgress: true,
            sourcesForReplace: _.filter(props.sources, s => s.id !== sourceIdToDelete),
            replaceTo: null
        });
    }

    componentWillReceiveProps(nextProps: Readonly<IProps>) {
        const {sourcesForReplace} = this.state;
        this.setState({
            checkingInProgress: false,
            sourceConnected: !!nextProps.sourceConnected,
            replaceTo: _.isEmpty(sourcesForReplace) ? null : sourcesForReplace[0].id
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
        const {source, sourceConnected, checkingInProgress, replaceTo, sourcesForReplace} = this.state;
        if (checkingInProgress) {
            return (<Spinner/>);
        }
        return (
            <React.Fragment>
                <DialogTitle>Вы уверены, что хотите удалить категорию <strong>'{source.title}'</strong>?</DialogTitle>
                {
                    sourceConnected ?
                        _.isEmpty(sourcesForReplace) ?
                            <DialogContent><p>Должен быть как минимум одн источник в аккаунте!</p></DialogContent> :
                            <DialogContent>
                                <p>У категории <strong>'{source.title}'</strong> есть расходы. Выберите категорию для
                                    замены:</p>
                                <FormControl>
                                    <Select
                                        value={replaceTo ? replaceTo : sourcesForReplace[0].id}
                                        onChange={this.handleReplaceToValueChange}
                                    >
                                        {sourcesForReplace.map(c => <MenuItem key={c.id}
                                                                              value={c.id}>{c.title}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </DialogContent>
                        : null
                }
                <DialogActions>
                    {
                        ((sourceConnected && !_.isEmpty(sourcesForReplace)) || !sourceConnected) &&
                        <Button onClick={this.handleDeleteSource} variant="contained" color="secondary">
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

    private handleDeleteSource = () => {
        const {source, replaceTo} = this.state;
        this.props.onDeleteSource(source.id, replaceTo);
        this.props.onModalClose();
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    onCheckSource: bindActionCreators((sourceId) => checkSource(sourceId), dispatch),
    onDeleteSource: bindActionCreators((sourceId, replaceTo) => deleteSource(sourceId, replaceTo), dispatch),
    onUnmount: bindActionCreators(() => setSourceCheckResultToStore(null), dispatch)
});

export default connect(null, mapDispatchToProps)(DeleteSourceModal);