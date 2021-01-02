
import React,{ useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import {Typography,TextField, Button,Dialog,DialogActions ,DialogContent  ,DialogTitle  } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
       maxWidth: 1000,
      justifyContent: 'space-between',
      margin: 5,
      marginLeft: 50
  },
  warning:{
    margin: 10,
  }
}));
export default function Profile() {
    const [success, setSuccess] = useState(true);
    const classes = useStyles();
    const history = useHistory();
    const url = localStorage.getItem("backend");
    const user= JSON.parse(localStorage.getItem('user'));
    const token=JSON.parse(localStorage.getItem('token'));
    const [oldPassword,setOldPassword]= useState();
    const [newPassword,setNewPassword]=useState();
    const [checkPassword,setCheckPassword]=useState();
    const [refresh,setRefresh]=useState(true);
    const [err,setErr]=useState(false);
    const [errMess, setErrMess]= useState("")

      const handleChangePassword=async()=>{
        console.log(newPassword);
        console.log(checkPassword);
        if(newPassword===checkPassword)
         {  setErr(false);
             await changePassword();
            setRefresh(!refresh);
         }
         else
         {
             setErr(true);
             setErrMess('Mật khẩu mới không trùng khớp');
         }
      }
      const changePassword=async()=>
      {   
          const body={
            oldPassword:oldPassword,
            newPassword:newPassword
          }
          const res= fetch(url+`profile/changepassword/${user._id}`,{
            method: "POST",
            mode: "cors",
            headers:{
              Authorization: 'Bearer '+`${token}`,
              'Content-Type': 'application/json',
            },
          
            body:JSON.stringify(body),
        })
        .then((res) => res.json())
        .then((result) => {
          console.log(result.message);
          setErr(true);
          if(result.message==="success")
            setErrMess('Đổi mật khẩu thành công');
            else
            setErrMess('Mật khẩu cũ không đúng');

        })
        .catch((err)=>
        {
          console.log('change pass fail')
        })

      }
            
      
  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Đổi mật khẩu
      </Typography>
      <Grid className={classes.warning}>
      {err&&
      <label>{errMess}</label>
      }</Grid>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            type="password"
            label="Mật khẩu cũ"
            fullWidth
            onChange={e=>setOldPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="new"
            name="new"
            type="password"
            label="Mật khẩu mới"
            fullWidth
            onChange={e=>setNewPassword(e.target.value)}
                   
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="check"
            name="check"
            type="password"
            label="Nhập lại mật khẩu mới"
            fullWidth
            onChange={e=>setCheckPassword(e.target.value)}
            
          />
        </Grid>
        <Grid item xs={12} sm={9}>
        <Button variant="contained"  href='/profile' color="primary">
           Quay về
        </Button>
        </Grid>
      <Grid item xs={12} sm={3}> 
        <Button variant="contained" onClick={handleChangePassword} color="primary">
           Lưu mật khẩu
        </Button>
       
      </Grid>
      </Grid>
      
     
    </div>
  );
}