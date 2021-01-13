import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import Snackbar from '@material-ui/core/Snackbar';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const url= localStorage.getItem('backend');

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [open,setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [err,setErr]=useState(false);
  const [errMess, setErrMess]= useState("");
  const usernameCheck =  /^[a-zA-Z0-9]+$/;
  const phoneCheck =  /^[0-9]+$/;
  const emailCheck=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addUser = async () => {
    console.log("add");
    sendaddUser();
    // history.push("/");
  };
  const checkUser = async()=>
  {  //console.log("username is ok: "+!userName.match(usernameCheck));
    if(userName=="" ||!userName.match(usernameCheck))  
    { 
      
      setContent("Tên đăng nhập rỗng hoặc có kí tự đặc biệt");
      return false;
    }
    if(password=="" )  
    { 
      console.log("run");
      setContent("Mật khẩu rỗng");
      return false;
    }
    if(name=="" ||!name.match(usernameCheck))  
    { 
      
      setContent("Tên người dùng rỗng hoặc có kí tự đặc biệt");
      return false;
    }
    if(phone=="" || !phone.match(phoneCheck))
    {
      setContent("Số điện thoại rỗng hoặc có kí tự khác số");
      return false;
    }
    if(email==""|| !email.match(emailCheck))
    {
      setContent("Email rỗng hoặc không đúng");
      return false;
    }
    //console.log("true");
      return true;

  }
  const sendaddUser = async () => {
    //console.log("send"); 
    //console.log("check:"+ await checkUser());
    if(! await checkUser())
    {   
        setOpen(true);
        return false;
    }
   
    const body = {
      username: userName,
      password: password,
      name: name,
      phone:phone,
      email:email
    };
    
    console.log(body);
    //console.log(1);
    // const res = await fetch(url + `users/signup`, {
      const res = await fetch("https://apiuser-caro.herokuapp.com/users/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if(res.status==200){
      setContent("Đăng kí thành công .Vui lòng kiểm tra email trước khi đăng nhập!");
      setOpen(true);
    }else{
      setContent("Thất bại!!!");
      setOpen(true);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="UserName"
                autoFocus
                onChange={(e)=>setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                name="Name"
                autoComplete="name"
                onChange={(e)=>setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Phone"
                label="Phone"
                name="Phone"
                autoComplete="Phone"
                onChange={(e)=>setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
           
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={addUser}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        message={content}
        key={1}
      />
    </Container>
  );
}
