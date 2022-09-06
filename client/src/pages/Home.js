import React from "react";
import { useQuery } from "@apollo/client";
import Grid from '@mui/material/Grid';
import { Transition } from "semantic-ui-react";

import { FETCH_ALL_POSTS_QUERY } from "../utils/queries";
import PostCard from "../components/PostCard";
import Auth from "../utils/auth";
import PostForm from "../components/PostForm";

function Home() {
  const user = Auth.loggedIn();
  const { loading, data } = useQuery(FETCH_ALL_POSTS_QUERY);
  const { getPosts: posts } = {...data}

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} className="page-title">
        <h1>Recent Posts</h1>
      </Grid>
      <Grid  container spacing={3} pt={2.5} >
        {user && (
          <Grid item xs={4}>
            <PostForm />
          </Grid>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Grid item xs={8}>
            {
              posts &&
              posts.map((post) => (
                <Grid item xs={4} key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid>
              ))
            }
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
export default Home;