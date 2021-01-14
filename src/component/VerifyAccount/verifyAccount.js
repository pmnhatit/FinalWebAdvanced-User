import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {useParams} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function(){
    const {code, username} = useParams();
    console.log(code);
    console.log(username)
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
//   const [message, setMessage] = useState("");
  //id user de lay nhung bang cua user do
//   const user = JSON.parse(localStorage.getItem('user')); 
//   const user_id=user.id;
//   const token = JSON.parse(localStorage.getItem('token'));

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    // fetch("https://apiuser-caro.herokuapp.com/verify/verify-account",{
      fetch("http://localhost:5000/verify/verify-account",{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
    //   headers: {
    //     Authorization: 'Bearer ' + `${token}`,
    //      'Content-Type': 'application/json',
    //   },
        body: JSON.stringify({
            code: code,
            username: username,
        })
    })
      .then(res => res.json())
      .then(
        (result) => {
            setIsLoaded(true);
            // setMessage(result.message);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
      )
  }, [])

  const handleClick = (e) =>{
    e.preventDefault();
    history.push("/");
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>
        <Container className={classes.cardGrid} maxWidth="md">
            Verifying...
        </Container></div>;
  } else {
    return (<>
        <Container className={classes.cardGrid} maxWidth="md">
            Your email has been verified. Click here to <Link onClick={handleClick}>Login</Link>
        </Container>
    </>);
  }
    
}