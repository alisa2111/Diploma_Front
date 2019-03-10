import React from 'react';
import {ICategory} from "../../models";
import IconWrapper from "../icons/IconWrapper";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import classNames from "classnames";

interface IProps {
    category: ICategory
    classes: {
        div: string,
        row: string,
        side: string,
        text: string,
        colorPicker: string,
        colorSquare: string
    }
}

class CategoryRow extends React.PureComponent<IProps, {}> {

    render() {
        const {category, classes} = this.props;
        return (
            <div className={classes.row}>
                <div className={classNames(classes.side, [classes.div])}>
                    <IconWrapper icon={category.iconKey}/>
                </div>
                <div className={classNames(classes.text, [classes.div])}>
                    <h2>{category.title}</h2>
                </div>
                <div className={classNames(classes.side, [classes.colorPicker, classes.div])}>
                    <div style={{backgroundColor: category.color}} className={classes.colorSquare}/>
                </div>
            </div>
        );
    }
}

const styles = createStyles({
    div: {
        display: 'inline-block'
    },
    row: {
        display: 'flex',
        border: "1px solid gray",
        padding: "4px"
    },
    side: {
        width: "20%"
    },
    text: {
        width: "60%"
    },
    colorPicker: {
        padding: "7px"
    },
    colorSquare: {
        height: "50px",
        width: "50px"
    }
});

export default withStyles(styles)(CategoryRow);