import React from "react";
import { useQuery } from "@apollo/client";
import Grid from '@mui/material/Grid';

import { FETCH_ALL_POSTS_QUERY } from "../utils/queries";
import PostCard from "../components/PostCard";
import Auth from "../utils/auth";
import PostForm from "../components/PostForm";
import { Container } from "@mui/material";

function Home() {
  const user = Auth.loggedIn();
  const { loading, data } = useQuery(FETCH_ALL_POSTS_QUERY);
  const { getPosts: posts } = {...data}

  return (
    <Container maxWidth="xl" sx={{ p:3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} className="page-title">
          <h1>Recent Posts</h1>
        </Grid>
        <Grid  container spacing={4} p={2.5} >
          {user && (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
              <PostForm />
            </Grid>
          )}
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            <>
                {
                  posts &&
                  posts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={post.id} style={{ marginBottom: 20 }}>
                      <PostCard post={post} />
                    </Grid>
                  ))
                }
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
export default Home;