import React from "react";
import Auth from "../utils/auth";

function Settings(){
  const {data: user} = Auth.getProfile();


  return (
    <h1>
      {user.username}
    </h1>
  )

}

export default Settings;