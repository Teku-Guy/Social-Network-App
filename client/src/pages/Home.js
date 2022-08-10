import React from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import { FETH_THOUGHTS_QUERY } from "../utils/queries";
import Auth from "../utils/auth";

function Home() {
  const {data: { username, email, id}} = Auth.getProfile();
  console.log(id);

  const { loading, data } = useQuery(FETH_THOUGHTS_QUERY);
  const { getThoughts: thoughts } = {...data}
  console.log(thoughts)


  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          thoughts &&
          thoughts.map((thought) => (
            <Grid.Column key={thought.id} style={{ marginBottom: 20 }}>
              <PostCard post={thought} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}
export default Home;