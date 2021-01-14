import React ,{ useState, useEffect ,useContext} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MenuAppBar from '../Bar/bar';
import SignIn from '../Signin/signin';
import SignUp from "../Signup/signup"
import App from "../../App"
import OnlineUser from '../Online/onlineUser'
import Homepage from '../Homepage/homepage'
import HomepageGame from '../Homepage/homepage_game'
import MatchHistory from '../MatchHistory/matchHistory'
import TableOnline from '../Online/tableonline'
import SettingRoom from '../Room/settingroom'
import ScreenGame from '../ScreenGame/screengame'
import { Context } from "../Constant/context";
import Profile from '../Profile/profile';
import changePassword from "../Profile/ChangePassword/changePassword";
import VerifyAccount from "../VerifyAccount/verifyAccount";
import ForgotPassword from "../ForgotPassword/forgotPassword";
import ResetPassword from "../ResetPassword/resetPassword";
import Chart from "../Charts/Charts"
import {PrivateRoute} from "./privateRouter"
import GameHistory from '../DetailHistory/gamehistory'
export default function Main()
{   
    const [context, setContext] = useState("default context value");
    //  localStorage.setItem('backend',`https://apiuser-caro.herokuapp.com/`);
    localStorage.setItem('backend',`http://localhost:5000/`);
    return(
        <BrowserRouter>
        <MenuAppBar/>
        <div className="main-route-place">
            <Switch>
            <Context.Provider value={[context, setContext]}>
            <Route  path='/signup' component={SignUp}/>
            <PrivateRoute  path='/online' component={OnlineUser}/>
            <Route exact path='/' component={SignIn}/>
            <PrivateRoute exact path='/app' component={App}/>
            <PrivateRoute exact path='/homepage' component={Homepage}/>
            <PrivateRoute  exact path='/history' component={MatchHistory}/>
            <PrivateRoute  exact path='/tableonline' component={TableOnline}/>
            <PrivateRoute exact path='/settingroom' component={SettingRoom}/>
            <PrivateRoute exact path='/screengame' component={ScreenGame}/>
            <PrivateRoute exact path='/homepage_game' component={HomepageGame}/>
            <PrivateRoute exact path='/profile' component={Profile}/>
            <PrivateRoute exact path='/changepassword' component={changePassword}/>
            <PrivateRoute exact path='/verify-email/:code/:username' component={VerifyAccount}/>
            <Route exact path='/forgot-password' component={ForgotPassword}/>
            <Route exact path='/reset-password/:username' component={ResetPassword}/>
            <PrivateRoute exact path='/chart' component={Chart}/>
            <PrivateRoute exact path='/gamehistory/:id' component={GameHistory}/>
            </Context.Provider>
            </Switch>
        </div>
        
        </BrowserRouter>
    );
}
