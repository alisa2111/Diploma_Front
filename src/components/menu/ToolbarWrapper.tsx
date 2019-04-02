import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import classNames from "classnames";
import {withStyles} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import createStyles from "@material-ui/core/styles/createStyles";
import {Link} from "react-router-dom";
import config from "../../config";
import TextField from '@material-ui/core/TextField';
import {IAttachedAccount} from "../../models";
import MenuItem from '@material-ui/core/MenuItem';
import _ from "lodash";
import {Avatar} from "@material-ui/core";

interface IProps {
    classes: {
        menuButton: string;
        hide: string;
        grow: string;
        title: string;
        accountDropdown: string;
        inputRoot: string;
        inputInput: string;
        sectionDesktop: string;
        sectionMobile: string;
    };
    handleDrawerOpen: () => void;
    handleProfileMenuOpen: (event: any) => void;
    handleMobileMenuOpen: (event: any) => void;
    handleChangeAccount: (event: any) => void;
    isMenuOpen: boolean;
    isDrawerOpen: boolean;
    accountId: string | null;
    user: any; // TODO IUSER
}

class ToolbarWrapper extends React.Component<IProps, {}> {

    render() {
        const {
            classes,
            handleDrawerOpen,
            handleProfileMenuOpen,
            handleMobileMenuOpen,
            isMenuOpen,
            isDrawerOpen,
            accountId,
            user,
        } = this.props;
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
                        Clear Money
                    </Typography>
                </Link>
                <div className={classes.accountDropdown}>
                    {!_.isEmpty(user.accounts) &&
                    <TextField
                        select
                        value={accountId ? accountId : user.accounts[0].id}
                        onChange={this.props.handleChangeAccount}
                    >
                        {_.map(user.accounts, (account: IAttachedAccount, index: number) => (
                            <MenuItem key={`${account.name}-${index}`} value={account.id}>
                                {account.name}
                            </MenuItem>
                        ))}

                        <MenuItem value="create">
                            <em>Открыть счет</em>
                        </MenuItem>

                    </TextField>}
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
                        <Avatar src={user.picture}/>
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
    accountDropdown: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
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