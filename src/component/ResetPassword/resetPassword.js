import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useParams} from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function(){
    const {username} = useParams();
    console.log(username)
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [open, setOpen] = useState(false);
  const [mess, setMess] = useState("");
  const history = useHistory();
const handleClick = () =>{
    history.push("/");
}
const resetPass = async () => {
    const body = {
      code: code,
      newPass: newPass,
      username: username
    };
    console.log(body);
    console.log(1);
    // const res = await fetch(url + `users/signup`, {
      const res = await fetch("https://apiuser-caro.herokuapp.com/users/reset-password", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if(res.status==200){
        setMess("");
      setOpen(true);
    }else{
        setMess("Something wrong!");
      setOpen(true);
    }
  };
  let content;
  if(open){
      if(mess===""){
        content=<div>Your password has been reset. Click here to <Link onClick={handleClick}>Login</Link></div>
      }else{
          content=<div style={{color:'red', display:'flex', justifyContent:'center'}}>{mess}</div>
      }
      
  }else{
      content=<div></div>;
  }
//   content=open? <div>Your password has been reset. Click here to <Link onClick={handleClick}>Login</Link></div> : "Something wrong!"
  const handleConfirm = (e) =>{
    e.preventDefault();
    resetPass();
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  else {
    return (<Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Reset password for {username}
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="numcode"
              label="Code Number"
              name="numcode"
              autoFocus
              onChange={(e)=>setCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
              name="newpass"
              variant="outlined"
              type="password"
              required
              fullWidth
              id="newpass"
              label="New Password"
              onChange={(e)=>setNewPass(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
         
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleConfirm}
        >
          Reset Password
        </Button>
      </form>
    </div>
    <Container className={classes.cardGrid} maxWidth="md">
        {content}    
    </Container>
    <Box mt={5}>
      <Copyright />
    </Box>
  </Container>);
  }
    
}