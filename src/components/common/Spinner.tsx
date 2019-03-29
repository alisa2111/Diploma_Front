import React from 'react';
import {CircularProgress} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";

interface IProps {
    classes: {
        spinnerWrapper: string,
        spinner: string
    }
}

class Spinner extends React.PureComponent<IProps, {}> {

    render() {
        return (
            <div className={this.props.classes.spinnerWrapper}>
                <CircularProgress className={this.props.classes.spinner}/>
            </div>
        );
    }
}

const styles = () => createStyles({
    spinnerWrapper: {
        minWidth: '100px',
        minHeight: '100px'
    },
    spinner: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-20px",
        marginLeft: "-20px"
    }
});

export default withStyles(styles)(Spinner);