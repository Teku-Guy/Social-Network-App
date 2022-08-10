import React from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import { FETCH_THOUGHTS_QUERY } from "../utils/queries";
import Auth from "../utils/auth";
import PostForm from "../components/PostForm";

function Home() {
  const user = Auth.loggedIn();
  if(user){
    const {data: { username, email, id}} = Auth.getProfile();
    console.log(id);
  }

  const { loading, data } = useQuery(FETCH_THOUGHTS_QUERY);
  const { getThoughts: thoughts } = {...data}
  console.log(thoughts)


  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {
              thoughts &&
              thoughts.map((thought) => (
                <Grid.Column key={thought.id} style={{ marginBottom: 20 }}>
                  <PostCard post={thought} />
                </Grid.Column>
              ))
            }
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}
export default Home;