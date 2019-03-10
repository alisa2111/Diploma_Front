import React from "react";
import classNames from "classnames";
import IconButton from '@material-ui/core/IconButton';
import {Drawer, withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import createStyles from "@material-ui/core/styles/createStyles";
import SideBarList from "./SideBarList";

const drawerWidth = 240;

const drawerStyles = (theme: any) =>  createStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

interface IProps {
    theme: {
        direction: string;
    };
    classes: {
        drawer: string;
        drawerOpen: string;
        drawerClose: string;
        toolbar: string;
    }
    isDrawerOpen: boolean
    handleDrawerClose: () => void;
}

class DrawerWrapper extends React.Component<IProps, {}> {

    render() {
        const {classes, theme, isDrawerOpen, handleDrawerClose} = this.props;
        return (
            <Drawer
                variant="permanent"
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: isDrawerOpen,
                    [classes.drawerClose]: !isDrawerOpen,
                })}
                classes={{
                    paper: classNames({
                        [classes.drawerOpen]: isDrawerOpen,
                        [classes.drawerClose]: !isDrawerOpen,
                    }),
                }}
                open={isDrawerOpen}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>

                <SideBarList/>

            </Drawer>
        );
    }
}

export default withStyles(drawerStyles, {withTheme: true})(DrawerWrapper);