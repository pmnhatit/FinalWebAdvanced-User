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
}));
export default function Profile() {
    const [success, setSuccess] = useState(true);
    const classes = useStyles();
    const history = useHistory();
    const url = localStorage.getItem("backend");
    const user= JSON.parse(localStorage.getItem('user'));
    const token=JSON.parse(localStorage.getItem('token'));
    const [open, setOpen] = React.useState(false);
    const [profile,setProfile]= useState({_id:"",password:"",username:"",name:"",phone:"",email:"",matches:0,trophies:1000,win_rate:100}); 
    const [name,setName]= useState();
    const [phone,setPhone]=useState();
    const [refresh,setRefresh]=useState(true);
    

    useEffect(() => {
      const res =  fetch(url+`profile/${user._id}`, {
        method: "GET",
        mode: "cors",
        headers: {
           Authorization:'Bearer '+ `${token}`,
           'Content-Type': 'application/json',
      },
        // body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((result) => {
          setProfile(result);
          console.log(profile.username);
        })
        .catch((err) => {
          setSuccess(false);
          console.log("fail load profile");
        });
      }, [refresh])

      const handleChangeProfile=async()=>{
         await updateProfile();
          setRefresh(!refresh);
          handleClose();
      }
      const updateProfile=async()=>
      {
          const body={
            name: name,
            phone: phone
          }
          const res= fetch(url+`profile/edit/${user._id}`,{
            method: "POST",
            mode: "cors",
            headers:{
              Authorization: 'Bearer '+`${token}`,
              'Content-Type': 'application/json',
            },
          
            body:JSON.stringify(body),
        })
        .catch((err)=>
        {
          console.log('edit fail')
        })

      }
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Thông tin cá nhân
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <TextField
            required
            id="userName"
            name="userName"
            label="Tên đăng nhập"
            fullWidth
            
            InputProps={{
              readOnly: true,
            }}
            value={profile.username}

          />
        </Grid>
       
        <Grid item xs={12}>
          <TextField
            required
            id="Name"
            name="Name"
            label="Họ và tên"
            fullWidth
           
           value={profile.name}
           
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            name="phone"
            label="Số điện thoại"
            fullWidth
            
            value={profile.phone}
            
          />
        </Grid>
       
        
        <Grid item xs={12} >
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            value={profile.email}
          />
        </Grid> 
        <Grid item xs={12}>
          <TextField
            required
            id="trophies"
            name="trophies"
            label="Số cúp"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={profile.trophies}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id=""
            name=""
            label="Số trận đã đánh"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={profile.matches}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField
            required
            id="rate"
            name="rate"
            label="Tỉ lệ thắng"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={profile.win_rate}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
        <Button variant="contained" href='/homepage'  color="primary">
           Quay về
        </Button>
        </Grid>
      <Grid item xs={12} sm={5}> 
        <Button variant="contained" href ='/changepassword'color="primary">
           Đổi mật khẩu
        </Button>
        <Button variant="contained" onClick={handleClickOpen} color="primary">
           Thay đổi thông tin
        </Button>
      </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Thay đổi thông tin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Họ và tên"
            fullWidth
            onChange={e=>setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Số điện thoại"
            fullWidth
            onChange={e=>setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Trở lại
          </Button>
          <Button onClick={handleChangeProfile} color="primary">
            Thay đổi
          </Button>
        </DialogActions>
      </Dialog>
     
    </div>
  );
}