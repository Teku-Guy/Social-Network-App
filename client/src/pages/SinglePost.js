import React, { useState } from "react";
import { useParams } from 'react-router';
import { useMutation, useQuery } from "@apollo/client";
import moment from 'moment';
import {
  Grid,
  Box,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Button
} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';

import { FETCH_POST_QUERY } from "../utils/queries";
import { SUBMIT_COMMENT_MUTATION } from "../utils/mutations";
import Auth from "../utils/auth";
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
  const {data: user} = Auth.getProfile();
  const { postId } = useParams();
  const [comment, setComment] = useState('');
  const { data:  getPost } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(){
      setComment('');
    },
    variables: {
      postId,
      body: comment
    }
  })
  
  function deletePostCallback(){
    window.location.assign('/');
  };

  let postMarkup;
  if(!getPost){
    postMarkup = <p>Loading Post..</p>
  } else {
    const {
      getPost: {
        id,
        body,
        createdAt,
        username,
        comments,
        likes,
        likeCount,
        commentCount
      }
    } = getPost;

    postMarkup = (
      <Grid container spacing={2}>
        <Grid item lg={2}>
          <Avatar alt={`${username}`} src="https://react.semantic-ui.com/images/avatar/large/molly.png" sx={{ width: 200, height: 200 }}/>
        </Grid>
          <Grid item lg={10}>
            <Card sx={{ mb:2.5}}>
              <CardHeader title={`${username}`}  subheader={moment(createdAt).fromNow()}/>
              <CardContent>
                <Typography variant="body1">
                  {body}
                </Typography>
              </CardContent>
              <hr />
              <CardActions sx={{ padding: "24px" }}>
                <LikeButton user={user} post={{id, likes, likeCount }} />
                <BadgeUnstyled showZero badgeContent={commentCount}>
                  <IconButton >
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                </BadgeUnstyled>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback}/>
                )}
              </CardActions>
            </Card>
            {user && (
              <Card sx={{ mb:2.5}}>
                <CardContent>
                  <p>React to this Post</p>
                  <Box component='form' autoComplete="off">
                      <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="comment">Comment...</InputLabel>
                        <Input
                          id="comment"
                          name="comment"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <Button 
                                type="submit"
                                disableElevation={true}
                                disabled={comment.trim() === ''}
                                onClick={submitComment}
                              >
                                Submit
                              </Button>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                      
                  </Box>
                </CardContent>
              </Card>
            )}
            {comments.map((comment) => (
              <Card sx={{ mb:0.5}} key={comment.id}>
                <CardContent disableSpacing>
                  <CardHeader
                    title={`${comment.username}`}
                    subheader={`${moment(comment.createdAt).fromNow()}`}
                    action={
                      user && user.username === comment.username && (
                        <DeleteButton
                          postId={id}
                          commentId={comment.id}
                        />
                      )
                    }
                  />
                  <CardContent>
                    <Typography variant="body1">
                        {comment.body}
                    </Typography>
                  </CardContent>
                </CardContent>
              </Card>
            ))}
          </Grid>
      </Grid>
    )
  }

  return postMarkup;
}

export default SinglePost;