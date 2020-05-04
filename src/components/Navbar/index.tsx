import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';

import { connect } from "react-redux";
import { toggleDrawer } from "../../actions/main";
import { logout } from "../../actions/auth";


import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import avatar from "../../assets/img/avatar.jpeg";

import { withRouter, RouteComponentProps } from "react-router-dom";
import Button from '@material-ui/core/Button';
import _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    openDrawer: {
      display: "block",
      [theme.breakpoints.up('sm')]: {
        display: "none",
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: "none",
      [theme.breakpoints.up('sm')]: {
        display: "block",
      },
    },
  }),
);

interface NavbarProps {
  toggleDrawer: () => void,
  logout: (callback: () => void) => void,
  userInformation: object
}

const Navbar = (props: NavbarProps & RouteComponentProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 10 }}>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                {
                  _.get(props, "userInformation.userType", "") === "admin" ?
                    <MenuItem onClick={(e) => {
                      handleClose(e);
                      props.history.push("/admin/dashboard");
                    }}>Go to Admin Page</MenuItem> : ""
                }
                <MenuItem onClick={(e) => {
                  handleClose(e);
                  props.history.push("/account");
                }}>My account</MenuItem>
                <MenuItem onClick={(e: any) => {
                  handleClose(e);
                  props.logout(() => props.history.push("/signin"));
                }}>Logout</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  const handleToggleDrawer = () => {
    props.toggleDrawer()
  }

  const renderAccount = () => {
    return (
      <React.Fragment>
        <Button color="inherit" onClick={() => props.history.push("/trips")}>TRIPS</Button>
        <IconButton aria-label="notifications" color="inherit">
          <NotificationsIcon />
        </IconButton>

        <div onClick={handleToggle} style={{ cursor: "pointer" }}>
          <IconButton
            edge="end"
            aria-label="account of admin user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            ref={anchorRef}
          >
            <img src={avatar} className={classes.avatar} alt="avatar" />
          </IconButton>
          <Typography variant="overline" className="ml-05">{_.get(props, "userInformation.fullName", "")}</Typography>
        </div>

      </React.Fragment>
    )
  }

  const renderLogin = () => {
    return (
      <React.Fragment>
        <Button color="inherit" onClick={() => props.history.push("/signin")}>Login</Button>
        <Button color="inherit" onClick={() => props.history.push("/signup")}>Register</Button>
      </React.Fragment>
    )
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => props.history.push("/")}
          >
            <LoyaltyOutlinedIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.openDrawer}
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Bus-ticket
          </Typography>
          <div className={classes.grow} />
          {_.isEmpty(props.userInformation) ? renderLogin() : renderAccount()}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { userInformation: state.userInformation }
}

export default connect(mapStateToProps, { toggleDrawer, logout })(withRouter(Navbar));