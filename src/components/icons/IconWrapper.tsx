import React from 'react';
import _ from "lodash";
import Home from '@material-ui/icons/Home'
import Food from '@material-ui/icons/Fastfood'
import Shopping from '@material-ui/icons/ShoppingCart';
import AccountBalance from '@material-ui/icons/AccountBalance';
import ReportProblem from '@material-ui/icons/ReportProblem';
import Settings from '@material-ui/icons/Settings';
import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import AddPerson from '@material-ui/icons/PersonAdd';
import Airplane from '@material-ui/icons/AirplanemodeActive';
import Train from '@material-ui/icons/Train';
import Sum from '@material-ui/icons/Functions';
import Transport from '@material-ui/icons/Commute';
import {IconButton} from "@material-ui/core";

const styles = {
    categoryIcon: {
        fontSize: "50px",
        color: 'grey',
    }
};


export const icons = {
    'house': <Home style={styles.categoryIcon}/>,
    'food': <Food style={styles.categoryIcon}/>,
    'shoppingCart': <Shopping style={styles.categoryIcon}/>,
    'accountBalance': <AccountBalance style={styles.categoryIcon}/>,
    'reportProblem': <ReportProblem style={styles.categoryIcon}/>,
    'settings': <Settings style={styles.categoryIcon}/>,
    'add': <Add style={styles.categoryIcon}/>,
    'clear': <Clear style={styles.categoryIcon}/>,
    'addPerson': <AddPerson style={styles.categoryIcon}/>,
    'airplane': <Airplane style={styles.categoryIcon}/>,
    'train': <Train style={styles.categoryIcon}/>,
    'sum': <Sum style={styles.categoryIcon}/>,
    'transport': <Transport style={styles.categoryIcon}/>,
};

export const getIconsKeys = (): string[] => Object.keys(icons);

interface IProps {
    icon: string
    handleClick?: () => void
}

export default class IconWrapper extends React.Component<IProps, {}> {

    render() {
        return (
            <IconButton onClick={this.props.handleClick}>
                {_.get(icons, this.props.icon)}
            </IconButton>
        )
    }
}
