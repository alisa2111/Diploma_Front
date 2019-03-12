import React from 'react';
import {ICategory} from "../../models";
import IconWrapper from "../icons/IconWrapper";
import ClearIcon from '@material-ui/icons/Clear';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import classNames from "classnames";
import {IconButton} from "@material-ui/core";

interface IProps {
    category: ICategory
    onChooseCategory: () => void;
    onDeleteCategory: (e: any) => void;
    classes: {
        row: string,
        innerDiv: string,
        colorPicker: string,
        colorSquare: string,
    }
}

class CategoryRow extends React.PureComponent<IProps, {}> {

    render() {
        const {category, classes} = this.props;
        return (
            <div className={classes.row} onClick={this.props.onChooseCategory}>
                <div className={classNames(classes.innerDiv)}>
                    <IconWrapper icon={category.iconKey}/>
                    <h2>{category.title}</h2>
                </div>
                <div className={classNames(classes.innerDiv, classes.colorPicker)}>
                    <div style={{backgroundColor: category.color}} className={classes.colorSquare}/>
                    <IconButton onClick={this.props.onDeleteCategory}>
                        <ClearIcon/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

const styles = createStyles({
    innerDiv: {
        display: 'flex',
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        border: "1px solid gray",
        padding: "4px",
        justifyContent: 'space-between'
    },
    colorPicker: {
        padding: "7px"
    },
    colorSquare: {
        height: "50px",
        width: "50px"
    },
});

export default withStyles(styles)(CategoryRow);