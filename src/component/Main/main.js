import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MenuAppBar from '../Bar/bar';
import SignIn from '../Signin/signin';
import SignUp from "../Signup/signup"
import App from "../../App"
import OnlineUser from '../onlineUser'

export default function Main()
{   
    localStorage.setItem('backend',`http://localhost:3000/`);
    
    return(
        <BrowserRouter>
        <MenuAppBar/>
        <div className="main-route-place">
            <Switch>
            <Route  path='/signup' component={SignUp}/>
            <Route  path='/online' component={OnlineUser}/>
            <Route  path='/signin' component={SignIn}/>
            <Route path='/app' component={App}/>
            </Switch>
        </div>
        
        </BrowserRouter>
    );
}
