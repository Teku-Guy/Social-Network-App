import React from "react";
import { useParams } from 'react-router';
import { useQuery } from "@apollo/client";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import moment from 'moment';

import { FETCH_THOUGHT_QUERY } from "../utils/queries";
import Auth from "../utils/auth";
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SignleThought(props) {
  const {data: user} = Auth.getProfile();

  const { thoughtId } = useParams();
  //const thoughtId= props.match.params.thoughtId;
  console.log(thoughtId)

  const { data:  getThought } = useQuery(FETCH_THOUGHT_QUERY, {
    variables: {
      thoughtId
    }
  });
  
  function deleteThoughtCallback(){
    window.location.assign('/');
  };

  let postMarkup;
  if(!getThought){
    postMarkup = <p>Loading Thought..</p>
  } else {
    const {
      getThought: {
        id,
        body,
        createdAt,
        username,
        reactions,
        likes,
        likeCount,
        reactionCount
      }
    } = getThought;


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
                <Button as="div" labelPosition="right" onClick={() => console.log('Comment on thought')}>
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {reactionCount}
                  </Label>
                </Button>
                {user && user.username && username && (
                  <DeleteButton thoughtId={id} callback={deleteThoughtCallback}/>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup;
}

export default SignleThought;