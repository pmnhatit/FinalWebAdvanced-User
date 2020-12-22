import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MenuAppBar from '../Bar/bar';
import SignIn from '../Signin/signin';
import SignUp from "../Signup/signup"
import App from "../../App"
import OnlineUser from '../onlineUser'
import Homepage from '../Homepage/homepage'
import MatchHistory from '../MatchHistory/matchHistory'
import TableOnline from '../TableOnline/TableOnline'

export default function Main()
{   
     localStorage.setItem('backend',`https://apiuser-caro.herokuapp.com/`);
    // localStorage.setItem('backend',`http://localhost:5000/`);
    return(
        <BrowserRouter>
        <MenuAppBar/>
        <div className="main-route-place">
            <Switch>
            <Route  path='/signup' component={SignUp}/>
            <Route  path='/online' component={OnlineUser}/>
            <Route exact path='/' component={SignIn}/>
            <Route path='/app' component={App}/>
            <Route path='/homepage' component={Homepage}/>
            <Route path='/history' component={MatchHistory}/>
            <Route path='/tableonline' component={TableOnline}/>
            </Switch>
        </div>
        
        </BrowserRouter>
    );
}
