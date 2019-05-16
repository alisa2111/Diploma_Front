import React from 'react';
import _ from "lodash";
import Home from '@material-ui/icons/Home'
import Food from '@material-ui/icons/Fastfood'
import Shopping from '@material-ui/icons/ShoppingCart';
import AccountBalance from '@material-ui/icons/AccountBalance';
import ReportProblem from '@material-ui/icons/ReportProblem';
import Settings from '@material-ui/icons/Settings';
import Add from '@material-ui/icons/Add';
import AddCircle from '@material-ui/icons/AddCircle';
import Clear from '@material-ui/icons/Clear';
import AddPerson from '@material-ui/icons/PersonAdd';
import Airplane from '@material-ui/icons/AirplanemodeActive';
import Train from '@material-ui/icons/Train';
import Sum from '@material-ui/icons/Functions';
import Transport from '@material-ui/icons/Commute';
import CreditCard from '@material-ui/icons/CreditCard';
import Wallet from "@material-ui/icons/AccountBalanceWallet";
import Gift from "@material-ui/icons/CardGiftcard";
import Phone from "@material-ui/icons/Phone";
import Bar from "@material-ui/icons/LocalBar";
import Cafe from "@material-ui/icons/Restaurant";
import Hygiene from "@material-ui/icons/HotTub";
import Offer from "@material-ui/icons/LocalOffer";
import Sport from "@material-ui/icons/DirectionsRun";
import {IconButton} from "@material-ui/core";

export const getIconsKeys = (): string[] => Object.keys(icons);

interface IProps {
    icon: string
    checked?: boolean
    handleClick?: () => void
    className?: string
}

export default class IconWrapper extends React.Component<IProps, {}> {

    render() {
        const {checked, icon, handleClick, className="icon-button"} = this.props;
        return (
            <IconButton className={className} onClick={handleClick} style={checked ? {border: "2px solid blue"} : {}}>
                {_.get(icons, icon)}
            </IconButton>
        )
    }
}

const styles = {
    categoryIcon: {
        fontSize: "50px",
        color: 'grey',
        //todo: customizable font-size
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
    'addCircle': <AddCircle style={styles.categoryIcon}/>,
    'clear': <Clear style={styles.categoryIcon}/>,
    'addPerson': <AddPerson style={styles.categoryIcon}/>,
    'airplane': <Airplane style={styles.categoryIcon}/>,
    'train': <Train style={styles.categoryIcon}/>,
    'sum': <Sum style={styles.categoryIcon}/>,
    'transport': <Transport style={styles.categoryIcon}/>,
    'creditCard': <CreditCard style={styles.categoryIcon}/>,
    'wallet': <Wallet style={styles.categoryIcon}/>,
    'gift': <Gift style={styles.categoryIcon}/>,
    'phone': <Phone style={styles.categoryIcon}/>,
    'bar': <Bar style={styles.categoryIcon}/>,
    'cafe': <Cafe style={styles.categoryIcon}/>,
    'hygiene': <Hygiene style={styles.categoryIcon}/>,
    'offer': <Offer style={styles.categoryIcon}/>,
    'sport': <Sport style={styles.categoryIcon}/>
};
