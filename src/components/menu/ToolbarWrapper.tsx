import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import classNames from "classnames";
import {withStyles} from '@material-ui/core/styles';
import {AccountCircle} from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import {fade} from "@material-ui/core/styles/colorManipulator";
import {InputBase} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {Link} from "react-router-dom";
import config from "../../config";

interface IProps {
    classes: {
        menuButton: string;
        hide: string;
        grow: string;
        title: string;
        search: string;
        searchIcon: string;
        inputRoot: string;
        inputInput: string;
        sectionDesktop: string;
        sectionMobile: string;
    };
    handleDrawerOpen: () => void;
    handleProfileMenuOpen: (event: any) => void;
    handleMobileMenuOpen: (event: any) => void;
    isMenuOpen: boolean;
    isDrawerOpen: boolean;
}

class ToolbarWrapper extends React.Component<IProps, {}> {

    render() {
        const {classes, handleDrawerOpen, handleProfileMenuOpen, handleMobileMenuOpen, isMenuOpen, isDrawerOpen} = this.props;
        return (
            <Toolbar disableGutters={!isDrawerOpen}>
                <IconButton
                    className={classNames(classes.menuButton, {
                        [classes.hide]: isDrawerOpen,
                    })}
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon/>
                </IconButton>
                <Link to={config.appRouterLinks.HOME} style={{color: 'white', textDecoration: 'none'}}>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        Имя-Проекта
                    </Typography>
                </Link>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        placeholder="Поиск…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </div>
                <div className={classes.grow}/>
                <div className={classes.sectionDesktop}>
                    <IconButton color="inherit">
                        <NotificationsIcon/>
                    </IconButton>
                    <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                        <MoreIcon/>
                    </IconButton>
                </div>
            </Toolbar>
        );
    }
}

const toolbarStyles = (theme: any) =>  createStyles({
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});


export default withStyles(toolbarStyles)(ToolbarWrapper);