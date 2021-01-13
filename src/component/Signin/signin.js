import React, { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import socket from '../socket.io'
import { Context } from "../Constant/context";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const saveLocalStorage = (result) => {
  
//   localStorage.setItem("token", JSON.stringify(result.token));
//   localStorage.setItem("id", JSON.stringify(result.user._id));
//   localStorage.setItem("username", JSON.stringify(result.user.username));
//   localStorage.setItem("name", JSON.stringify(result.user.name));
//   localStorage.setItem("user", JSON.stringify(result.user));

//   // console.log(JSON.parse(localStorage.getItem('user')));
// };



export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [context, setContext] = useContext(Context);
  const url = localStorage.getItem("backend");
  const [success, setSuccess] = useState(true);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]=useState(false);
  const [errMess, setErrMess]= useState("");

  let once_time=0;
  socket.emit('disconnect');
  const createFetch = async (linkUrl, body)=>
{
  const res = await fetch(linkUrl, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      //console.log(result);
      setErr(true);
      setErrMess(result.message);
      saveLocalStorage(result);
      console.log(result);
      

      console.log(result.user.name);
      if(once_time===0){
        const data={
          name: result.user.name,
          id_player:result.user._id
        }
        socket.emit("onlineUser",data);
        socket.emit('tableonline');
        once_time++;
      }
      if(result.message=="200OK")
        history.push('/homepage');
    })
    .catch((err) => {
      setSuccess(false);
      console.log(err);
    });
}

  const handlerLogin = async (e) => {
    
    const body = {
      username: userName,
      password: password,
    };
    createFetch(url + "users/signin",body);
  };

  const responseGoogle = async(response) => {
    //console.log(response.tokenId);
    const body = {
      token: response.tokenId
    };
    createFetch(url + "users/signin/google",body);
  
  };
  const responseFacebook = (response) => {
    console.log(response.accessToken);
    const body = {
      
      accessToken:response.accessToken,
      userID :response.userID
    };
    
    createFetch(url + "users/signin/facebook",body);
  }
  const saveLocalStorage = (result) => {
  
    localStorage.setItem("token", JSON.stringify(result.token));
    localStorage.setItem("id", JSON.stringify(result.user._id));
    localStorage.setItem("username", JSON.stringify(result.user.username));
    localStorage.setItem("name", JSON.stringify(result.user.name));
    localStorage.setItem("user", JSON.stringify(result.user));
    setContext({id:result.user._id,username:result.user.username,name:result.user.name,user:result.user,token:result.token})
    // console.log(JSON.parse(localStorage.getItem('user')));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="UserName"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {err&&
      <label>{errMess}</label>
      }
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handlerLogin}>
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Quên mật khẩu
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <GoogleLogin
          clientId="718820147204-d08vqnq79hnapbjv3099umi363a7bf5k.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="1156392861430294"
          //autoLoad={true}
          fields="name,email,picture"
          //onClick={componentClicked}
          callback={responseFacebook} />,
          {/* <FacebookLogin
    appId="1156392861430294"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  />, */}
      
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

}
