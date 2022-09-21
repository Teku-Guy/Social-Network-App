
import React from "react";
import { useQuery } from "@apollo/client";
import { Avatar, Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import Auth from "../utils/auth";
import { FETCH_PROFILE_QUERY, FETCH_USER_POSTS_QUERY } from '../utils/queries';
import PostCard from "../components/PostCard";

function Profile(){
  const user = Auth.loggedIn();
  const { username } = useParams();
  const { data:  getUser } = useQuery(FETCH_PROFILE_QUERY, {
    variables: {
      username
    },
  });
  const { loading, data } = useQuery(FETCH_USER_POSTS_QUERY, {
    variables: {
      username
    },
  });
  const { getPostByUser: posts } = {...data};

  let profileLayout;
  if(!getUser){
    profileLayout = <p>Loading User..</p>;
  }else {
    const {
      getUser:{
        username,
        bio
      }
    } = getUser;
    profileLayout = (
      <Container maxWidth="xl" sx={{ p:10 }}>
        <Paper
          elevation={10}
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4
          }}
        >
          <Box component="section" py={{ xs:6, sm:12 }}>
            <Container>
              <Grid item xs={12} justifyContent="center" mx="auto">
                <Box mt={{ xs: -16, md: -20 }} textAlign="center">
                  <Avatar src="https://react.semantic-ui.com/images/avatar/large/molly.png" alt={`${username}`} sx={{ width: "110px", height: "110px", fontSize: "1rem" }} />
                </Box>
                <Grid container justifyContent="center" py={6}>
                  <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md:1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h3">{username}</Typography>
                    <Button variant="outlined" color="info" size="small">
                      Follow
                    </Button>
                  </Box>
                  <Grid container spacing={3} mb={3}>
                    <Grid item>
                      <Typography component="span" variant="body2" fontWeight="bold">
                        {Object.keys(posts || {}).length} &nbsp;
                      </Typography>
                      <Typography component="span" variant="body2" color="text">
                        Posts
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="span" variant="body2" fontWeight="bold">
                        {0}&nbsp;
                      </Typography>
                      <Typography component="span" variant="body2" color="text">
                        Followers
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="span" variant="body2" fontWeight="bold">
                        {0}&nbsp;
                      </Typography>
                      <Typography component="span" variant="body2" color="text">
                        Following
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" fontWeight="light" color="text">
                    {bio}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Container>
          </Box>
          <Box>
            {
              loading ? (
                <h1>Loading..</h1>
              ) : (
                <Grid  container spacing={4} p={2.5} >
                  {
                    posts && posts.map((post) => (
                      <Grid item xs={12} sm={6} md={4} key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                      </Grid>
                    ))
                  }
                </Grid>
              )
            }
          </Box>
        </Paper>
      </Container>
    )
  }

  return profileLayout;

}

export default Profile;