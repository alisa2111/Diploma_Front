import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Settings from '@material-ui/icons/Settings';
import Chart from "@material-ui/icons/InsertChartOutlined";
import Category from "@material-ui/icons/Category";
import DollarIcon from '@material-ui/icons/MonetizationOn';
import config from "../../config";
import {Link} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

interface IMenuItemProps {
    link: string;
    title: string;
    icon: any;
}

export default class SideBarList extends React.PureComponent <{}> {
    render() {
        return (
            <List>
                <MenuItem link={config.appRouterLinks.ACCOUNT} title={"Страница аккаунта"} icon={<Chart/>}/>
                <MenuItem link={config.appRouterLinks.HISTORY} title={"История счета"} icon={<DateRangeIcon/>}/>
                <MenuItem link={config.appRouterLinks.CATEGORY} title={"Управление категориями"} icon={<Category/>}/>
                <MenuItem link={config.appRouterLinks.SOURCE} title={"Ваш бумажник"} icon={<DollarIcon/>}/>
                <MenuItem link={config.appRouterLinks.SETTINGS} title={"Настройки"} icon={<Settings/>}/>
            </List>
        )
    }
}

const MenuItem = (props: IMenuItemProps) => {
    const {link, title, icon} = props;
    return (
        <Link to={link} style={styles.link}>
            <ListItem button>
                <Tooltip title={title}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary={title}/>
            </ListItem>
        </Link>
    )
};

const styles = ({
    link: {
        textDecoration: 'none'
    }
});