import React from 'react';
import {ISource} from "../../models";
import IconWrapper from "../icons/IconWrapper";
import ClearIcon from '@material-ui/icons/Clear';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import classNames from "classnames";
import {IconButton} from "@material-ui/core";

interface IProps {
    source: ISource
    onChooseSource: () => void;
    onDeleteSource: (e: any) => void;
    classes: {
        row: string,
        innerDiv: string,
        colorPicker: string,
        balance: string,
    }
}

class SourceRow extends React.PureComponent<IProps, {}> {

    render() {
        const {source, classes} = this.props;
        return (
            <div className={classes.row} onClick={this.props.onChooseSource}>
                <div className={classNames(classes.innerDiv)}>
                    <IconWrapper icon={source.type === "cash" ? "wallet" : "creditCard"}/>
                    <h2>{source.title}</h2>
                </div>
                <div className={classNames(classes.innerDiv)}>
                    <span className={classes.balance}>{source.balance} р.</span>
                    <IconButton onClick={this.props.onDeleteSource}>
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
    balance: {
        fontSize: "20px",
        marginRight: "15px"
    },
});

export default withStyles(styles)(SourceRow);