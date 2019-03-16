import React from 'react';
import _ from "lodash";
import {ICategory} from "../../models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createCategory, updateCategory} from "../../redux/category/actions";
import {TextField} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import Add from '@material-ui/icons/Add';
import {SketchPicker} from 'react-color';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import classNames from "classnames";
import IconsGrid from "../icons/IconsGrid";
import Button from "@material-ui/core/Button";

interface IReduxProps {
    createCategory: (category: ICategory) => void;
    updateCategory: (category: ICategory) => void;
}

interface IProps extends IReduxProps {
    category: ICategory | null
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
    category: ICategory
}

class CategoryTemplate extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        const {accountId} = this.props;
        this.state = {
            category: {
                id: "",
                title: "",
                iconKey: "",
                color: "#12C0B5",
                accountId: accountId
            }
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IProps>) {
        if (nextProps.category) {
            this.setState({category: nextProps.category});
        } else {
            this.resetState();
        }
    }

    render() {
        const {category} = this.state;
        const {classes} = this.props;
        return (
            <div>
                <TextField
                    label="Название"
                    fullWidth
                    value={category.title}
                    onChange={this.handleCategoryChange("title")}
                    className={classNames(classes.unit)}
                />
                <div className={classNames(classes.flexDiv)}>
                    <div>
                        <h3>Цвет:</h3>
                        <div className={classNames(classes.colorPickerPart, [classes.unit])}>
                            <div
                                style={{backgroundColor: category.color}}
                                className={classNames(classes.colorPicker)}

                            />
                            <SketchPicker
                                color={category.color}
                                onChange={this.handleChangeColor}
                            />
                        </div>
                    </div>
                    <IconsGrid checkedIcon={category.iconKey} onChooseIcon={this.handleChooseIcon}/>
                </div>
                <div className={classes.buttonWrapper}>
                    {
                        category.id ? <Button variant="contained" color="primary" className={classes.button}
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

    private handleCategoryChange = (field: string) => (e: any) => {
        const clonedCategory = _.clone(this.state.category);
        this.setState({
            category: _.assign(clonedCategory, {[field]: e.target.value}),
        });
    };

    private handleChangeColor = (color: any) => {
        const clonedCategory = _.clone(this.state.category);
        this.setState({
            category: _.assign(clonedCategory, {color: color.hex}),
        });
    };

    private handleChooseIcon = (iconKey: string) => () => {
        const clonedCategory = _.clone(this.state.category);
        this.setState({
            category: _.assign(clonedCategory, {iconKey: iconKey}),
        });
    };

    private handleButtonClick = () => {
        const {category} = this.state;
        if (category.id) {
            this.props.updateCategory(category);
        } else {
            this.props.createCategory(category);
        }
        this.resetState();
    };

    private resetState = () => {
        let clonedCategory = _.clone(this.state.category);
        this.setState({
            category: _.assign(clonedCategory, {
                id: "",
                title: "",
                iconKey: "",
                color: "#12C0B5"
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
    createCategory: bindActionCreators(category => createCategory(category), dispatch),
    updateCategory: bindActionCreators(category => updateCategory(category), dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(CategoryTemplate));