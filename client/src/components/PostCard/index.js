import React from 'react';
import { Card, Button, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Auth from '../../utils/auth';
import LikeButton from '../LikeButton';

function PostCard({
  post: { body, createdAt, id, username, likeCount, reactionCount, likes }
}) {

  const {data: user} = Auth.getProfile();

  return (
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <LikeButton user={user} post={{id, likes, likeCount }} />
      <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
        <Button color='blue' basic >
          <Icon name='comments' />
        </Button>
        <Label as='a' basic color='blue' pointing='left'>
          {reactionCount}
        </Label>
      </Button>
      {user && user.username === username && (
        <Button as="div" color="red" floated="right" onClick={()=> console.log('Delete Post')}>
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      )}
      </Card.Content>
    </Card>
  )
}

export default PostCard