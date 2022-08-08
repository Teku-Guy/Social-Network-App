import React from 'react';
import { Card, Button, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostCard({
  post: { body, createdAt, id, username, likeCount, reactionCount, likes }
}) {

  function likePost(){
    console.log("liked")
  }

  function reactToPost(){
    console.log("comment")
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
        <Button color='teal' basic>
          <Icon name='heart' />
        </Button>
        <Label as='a' basic color='teal' pointing='left'>
          {likeCount}
        </Label>
      </Button>
      <Button as='div' labelPosition='right' onClick={reactToPost}>
        <Button color='blue' basic>
          <Icon name='comments' />
        </Button>
        <Label as='a' basic color='blue' pointing='left'>
          {reactionCount}
        </Label>
      </Button>
      </Card.Content>
    </Card>
  )
}

export default PostCard