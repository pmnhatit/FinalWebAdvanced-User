import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";
import socket from '../socket.io'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  

  const handleMenu = async(event) => {
    {setAnchorEl(event.currentTarget);}
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHistory=()=>
  {
    handleClose();
    history.push('/history');
  }
  const handleProfile=()=>
  {
    handleClose();
    history.push('/profile');
  }
  
  const handleChart=()=>
  {
    handleClose();
    history.push('/chart');
  }
  const handleLogout=()=>
  {
    localStorage.setItem("user", JSON.stringify(""));
    localStorage.removeItem("token");
    socket.emit('logout');
    
    history.push('/');
  }
  const handleHome = () =>{
    history.push('/homepage');
  }

  return (
    <div className={classes.root}>
      <FormGroup>
        {/* <FormControlLabel
          // control={
          //   <Switch
          //     checked={auth}
          //     onChange={handleChange}
          //     aria-label="login switch"
          //   />
          // }
          //label={auth ? "Logout" : "Login"}
        /> */}
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <SportsEsportsIcon onClick={handleHome}/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tic-tac-toe
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Thông tin cá nhân</MenuItem>
                <MenuItem onClick={handleHistory} >Lịch sử đấu</MenuItem>
                <MenuItem onClick={handleChart}>Bảng xếp hạng</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
