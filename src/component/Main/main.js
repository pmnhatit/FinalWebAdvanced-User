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
            <Route  path='/online' component={OnlineUser}/>
            <Route exact path='/' component={SignIn}/>
            <Route exact path='/app' component={App}/>
            <Route exact path='/homepage' component={Homepage}/>
            <Route  exact path='/history' component={MatchHistory}/>
            <Route  exact path='/tableonline' component={TableOnline}/>
            <Route exact path='/settingroom' component={SettingRoom}/>
            <Route exact path='/screengame' component={ScreenGame}/>
            <Route exact path='/homepage_game' component={HomepageGame}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/changepassword' component={changePassword}/>
            <Route exact path='/verify-email/:code/:username' component={VerifyAccount}/>
            <Route exact path='/forgot-password' component={ForgotPassword}/>
            <Route exact path='/reset-password/:username' component={ResetPassword}/>
            </Context.Provider>
            </Switch>
        </div>
        
        </BrowserRouter>
    );
}
