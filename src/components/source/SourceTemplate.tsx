import React from 'react';
import _ from "lodash";
import {ISource} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {FormControl, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import Add from '@material-ui/icons/Add';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import {createSource, updateSource} from "../../redux/sources/actions";

interface IReduxProps {
    createSource: (source: ISource) => void;
    updateSource: (source: ISource) => void;
}

interface IProps extends IReduxProps {
    source: ISource | null
    accountId: string
    classes: {
        unit: string
        colorPicker: string
        colorPickerPart: string,
        flexDiv: string,
        leftIcon: string,
        buttonWrapper: string,
        button: string
    }
}

interface IState {
    source: ISource
}

class SourceTemplate extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        const {accountId} = this.props;
        this.state = {
            source: {
                id: "",
                title: "",
                balance: 0,
                accountId: accountId,
                type: 'cash'
            }
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IProps>) {
        if (nextProps.source) {
            this.setState({source: nextProps.source});
        } else {
            this.resetState();
        }
    }

    render() {
        const {source} = this.state;
        const {classes} = this.props;
        return (
            <div>
                <TextField
                    label="Название"
                    fullWidth
                    value={source.title}
                    onChange={this.handleSourceChange("title")}
                    className={classNames(classes.unit)}
                />
                <TextField
                    label="Баланс"
                    type="number"
                    fullWidth
                    value={source.balance}
                    onChange={this.handleSourceChange("balance")}
                    className={classNames(classes.unit)}
                />
                <FormControl fullWidth={true}>
                    <RadioGroup
                        aria-label="Тип"
                        value={source.type}
                        onChange={this.handleSourceChange("type")}
                    >
                        <FormControlLabel value="cash" control={<Radio/>} label="Наличные"/>
                        <FormControlLabel value="card" control={<Radio/>} label="Карта"/>
                    </RadioGroup>
                </FormControl>
                <div className={classes.buttonWrapper}>
                    {
                        source.id ? <Button variant="contained" color="primary" className={classes.button}
                                            onClick={this.handleButtonClick}>
                                <SaveIcon className={classNames(classes.leftIcon)}/>
                                Сохранить
                            </Button> :
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={this.handleButtonClick}>
                                <Add className={classNames(classes.leftIcon)}/>
                                Создать
                            </Button>
                    }
                    <Button variant="contained" className={classes.button} onClick={this.resetState}>
                        Сбросить
                    </Button>
                </div>
            </div>
        );
    }

    private handleSourceChange = (field: string) => (e: any) => {
        const clonedCategory = _.clone(this.state.source);
        this.setState({
            source: _.assign(clonedCategory, {[field]: e.target.value}),
        });
    };

    private handleButtonClick = () => {
        const {source} = this.state;
        if (source.id) {
            this.props.updateSource(source);
        } else {
            this.props.createSource(source);
        }
        this.resetState();
    };

    private resetState = () => {
        let clonedCategory = _.clone(this.state.source);
        this.setState({
            source: _.assign(clonedCategory, {
                id: "",
                title: "",
                balance: 0,
                type: 'cash'
            })
        })
    };
}

const styles = (theme: any) => createStyles({
    flexDiv: {
        display: 'flex'
    },
    unit: {
        margin: "25px 0"
    },
    colorPickerPart: {
        alignContent: 'center'
    },
    colorPicker: {
        width: "220px",
        height: "50px",
        border: "1px solid gray",
        marginBottom: "7px"
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    buttonWrapper: {
        justifyContent: 'space-between',
        display: 'flex'
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const mapDispatchToProps = (dispatch: any) => ({
    createCategory: bindActionCreators(source => createSource(source), dispatch),
    updateCategory: bindActionCreators(source => updateSource(source), dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(SourceTemplate as any));