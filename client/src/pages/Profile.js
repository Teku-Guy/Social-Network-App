import React from "react";
import Auth from "../utils/auth";

function Profile(){
  const user = Auth.getProfile();


  return (
    <h1>
      {user.username}
    </h1>
  )

}

export default Profile;