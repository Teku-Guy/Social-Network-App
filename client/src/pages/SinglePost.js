import React, { useState } from "react";
import { useParams } from 'react-router';
import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, Form, Grid, Icon, Image, Label } from "semantic-ui-react";
import moment from 'moment';

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
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{id, likes, likeCount }} />
                <Button as="div" labelPosition="right" onClick={() => console.log('Comment on Post')}>
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback}/>
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>React to this Post</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input type="text" placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                      />
                      <button type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup;
}

export default SinglePost;