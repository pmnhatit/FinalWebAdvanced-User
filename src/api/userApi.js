
import React from "react";
import { useHistory } from "react-router-dom";


function UserAPI() {

    const history = useHistory();
    const url = localStorage.getItem("backend");

    const handlerLogin = async (userName,password,setSuccess) => {
    console.log("handlerLogin");
    const body = {
      username: userName,
      password: password,
    };

    const res = await fetch(url + "users/signin", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((result) => {
        //  setSuccess(true);
        // /console.log(result.token);

        localStorage.setItem("token", JSON.stringify(result.token));
        localStorage.setItem("id", JSON.stringify(result.user.id));
        localStorage.setItem("username", JSON.stringify(result.username));
        console.log("Signin id:" + JSON.parse(localStorage.getItem("id")));
        console.log(localStorage.setItem("token", JSON.stringify(result.token))
        );
        history.push("/app");
      })
      .catch((err) => {
        setSuccess(false);
        console.log("error aa");
      });
  };


  return(<div></div>);
}
export default UserAPI;