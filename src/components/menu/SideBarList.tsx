import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DateRangeIcon from "@material-ui/icons/DateRange";
import config from "../../config";
import {Link} from "react-router-dom";

export default class SideBarList extends React.PureComponent <{}> {
    render() {
        return (
            <List>
                <Link to={config.appRouterLinks.HISTORY}>
                    <ListItem button>
                        <ListItemIcon><DateRangeIcon/></ListItemIcon>
                        <ListItemText primary={"История счета"}/>
                    </ListItem>
                </Link>
            </List>
        )
    }
}