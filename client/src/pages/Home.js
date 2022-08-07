import React from "react";
import { useQuery } from "@apollo/client";

import { FETH_THOUGHTS_QUERY } from "../utils/queries";

function Home() {
  const {loading, data} = useQuery(FETH_THOUGHTS_QUERY);

  if (loading) return <div>Loading...</div>;
  
  if(data){
    console.log(data);
  }

  return (
  	<div>
      <h1>Home Page</h1>
    </div>
  );
}
export default Home;