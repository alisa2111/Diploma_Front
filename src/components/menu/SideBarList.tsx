import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Chart from "@material-ui/icons/InsertChartOutlined";
import Category from "@material-ui/icons/Category";
import config from "../../config";
import {Link} from "react-router-dom";

export default class SideBarList extends React.PureComponent <{}> {
    render() {
        return (
            <List>
                <Link to={config.appRouterLinks.ACCOUNT} style={styles.link}>
                    <ListItem button>
                        <ListItemIcon><Chart/></ListItemIcon>
                        <ListItemText primary={"Страница аккаунта"}/>
                    </ListItem>
                </Link>
                <Link to={config.appRouterLinks.HISTORY} style={styles.link}>
                    <ListItem button>
                        <ListItemIcon><DateRangeIcon/></ListItemIcon>
                        <ListItemText primary={"История счета"}/>
                    </ListItem>
                </Link>
                <Link to={config.appRouterLinks.CATEGORY} style={styles.link}>
                    <ListItem button>
                        <ListItemIcon><Category/></ListItemIcon>
                        <ListItemText primary={"Управление категориями"}/>
                    </ListItem>
                </Link>
            </List>
        )
    }
}

const styles = ({
    link: {
        textDecoration: 'none'
    }
});