import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import createStyles from "@material-ui/core/styles/createStyles";
import AppBar from '@material-ui/core/AppBar';
import {SubdirectoryArrowLeft} from "@material-ui/icons";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {bindActionCreators} from "redux";
import {resetStore} from "../../redux/auth/actions";
import {connect} from "react-redux";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import UserRouts from "../routers/UserRouts";
import {IAccount, IStore, IUser} from "../../models";
import ToolbarWrapper from "./ToolbarWrapper";
import DrawerWrapper from "./DrawerWrapper";
import {BrowserRouter} from "react-router-dom";
import _ from 'lodash';
import {getAccountInfo} from "../../redux/account/actions";
import HomePage from "../HomePage";
import {Avatar} from "@material-ui/core";
import Spinner from "../common/Spinner";
import CreateAccountDialog from "../CreateAccountDialog";

const drawerWidth = 280;

interface IReduxProps {
    onLogOut: () => void;
    account: IAccount;
    onFetchAccount: (accountId: string) => void;
}

interface IProps extends IReduxProps {
    user: Partial<IUser>;
    classes: {
        root: string;
        appBar: string;
        appBarShift: string;
        content: string;
    }
}

interface IState {
    isDrawerOpen: boolean,
    anchorEl: null,
    mobileMoreAnchorEl: null,
    createAccountDialogOpen: boolean
}

class MenuWrapper extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isDrawerOpen: false,
            anchorEl: null,
            mobileMoreAnchorEl: null,
            createAccountDialogOpen: false
        };
    }

    componentWillMount() {
        const {user, account, onFetchAccount} = this.props;
        const accountIdFromStorage = localStorage.getItem("accountId") || "";

        if (!account && !_.isEmpty(accountIdFromStorage)) {
            onFetchAccount(JSON.parse(accountIdFromStorage) || "");
        }

        if (!account && _.isEmpty(accountIdFromStorage) && user.accounts && !_.isEmpty(user.accounts)) {
            onFetchAccount(user.accounts[0].id);
        }
    }

    render() {
        const {classes, user, account} = this.props;
        const {anchorEl, mobileMoreAnchorEl, isDrawerOpen, createAccountDialogOpen} = this.state;

        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: isDrawerOpen,
                        })}>
                        <ToolbarWrapper
                            user={user}
                            accountId={account ? account.id : null}
                            isMenuOpen={!!anchorEl}
                            isDrawerOpen={isDrawerOpen}
                            handleDrawerOpen={this.handleDrawerOpen}
                            handleProfileMenuOpen={this.handleProfileMenuOpen}
                            handleMobileMenuOpen={this.handleMobileMenuOpen}
                            handleChangeAccount={this.handleChangeAccount}
                        />
                    </AppBar>
                    <UserMenu
                        anchorEl={anchorEl}
                        handleLogOut={this.handleLogOut}
                        handleMenuClose={this.handleMenuClose}
                        user={user}
                    />
                    <UserMobileMenu
                        mobileMoreAnchorEl={mobileMoreAnchorEl}
                        handleLogOut={this.handleLogOut}
                        handleMobileMenuClose={this.handleMobileMenuClose}
                        user={user}
                    />
                    <DrawerWrapper
                        isDrawerOpen={isDrawerOpen}
                        handleDrawerClose={this.handleDrawerClose}
                    />
                    <main className={classes.content}>
                        {account ? <UserRouts user={user}/> :
                            _.isEmpty(this.props.user.accounts) ? <HomePage/> : <Spinner/>}
                    </main>
                    <CreateAccountDialog
                        isOpen={createAccountDialogOpen}
                        handleClose={this.handleCreateAccountModalClose}
                    />
                </div>
            </BrowserRouter>
        );
    }

    private handleDrawerOpen = () => this.setState({isDrawerOpen: true});

    private handleDrawerClose = () => this.setState({isDrawerOpen: false});

    private handleMenuClose = () => {
        this.setState({anchorEl: null});
        this.handleMobileMenuClose();
    };

    private handleLogOut = () => {
        localStorage.clear();
        this.props.onLogOut();
    };

    private handleMobileMenuOpen = (event: any) => this.setState({mobileMoreAnchorEl: event.currentTarget});

    private handleMobileMenuClose = () => this.setState({mobileMoreAnchorEl: null});

    private handleProfileMenuOpen = (event: any) => this.setState({anchorEl: event.currentTarget});

    private handleChangeAccount = (event: any) => {
        const accountId = event.target.value;
        if (accountId === 'create') {
            this.setState({createAccountDialogOpen: true});
        } else {
            localStorage.setItem("accountId", JSON.stringify(accountId));
            this.props.onFetchAccount(accountId);
        }
    };

    private handleCreateAccountModalClose = () => this.setState({createAccountDialogOpen: false});
}

interface IMenuProps {
    anchorEl?: null,
    handleMenuClose?: () => void;
    mobileMoreAnchorEl?: null,
    handleMobileMenuClose?: () => void;
    handleLogOut?: () => void;
    user: Partial<IUser>
}

const UserMenu = (props: IMenuProps) => {
    return (
        <Menu
            anchorEl={props.anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={!!props.anchorEl}
            onClose={props.handleMenuClose}
        >
            <MenuItem onClick={props.handleMenuClose}>Мой профиль</MenuItem>
                <Divider/>
            <MenuItem onClick={props.handleLogOut}>Выйти</MenuItem>
        </Menu>
    );
};

const UserMobileMenu = (props: IMenuProps) => {
    return (
        <Menu
            anchorEl={props.mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={!!props.mobileMoreAnchorEl}
            onClose={props.handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit">
                    <NotificationsIcon/>
                </IconButton>
                <p>Уведомления</p>
            </MenuItem>
            <MenuItem onClick={props.handleMenuClose}>
                <IconButton color="inherit">
                    <Avatar src={props.user.picture} />
                </IconButton>
                <p>Мой профиль</p>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={props.handleLogOut}>
                <IconButton color="inherit">
                    <SubdirectoryArrowLeft/>
                </IconButton>
                <p>Выйти</p>
            </MenuItem>
        </Menu>
    );
};

const styles = (theme: any) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    content: {
        flexGrow: 1,
        paddingLeft: 0,
        paddingTop: theme.spacing.unit * 8,
    },
});

const mapDispatchToProps = (dispatch: any) => ({
    onLogOut: bindActionCreators(() => resetStore(), dispatch),
    onFetchAccount: bindActionCreators((accountId) => getAccountInfo(accountId), dispatch),
});

const mapStateToProps = (store: IStore) => ({
    account: store.account
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuWrapper as any));
