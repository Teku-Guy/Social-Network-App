import React from 'react';
import { Card, Button, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Auth from '../../../utils/auth';
import LikeButton from '../../LikeButton';
import DeleteButton from '../../DeleteButton';
import MyPopup from '../../../utils/MyPopup';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {

  const {data: user} = Auth.getProfile();

  return (
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{id, likes, likeCount }} />
        <MyPopup content="Comment on Post">
          <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
            <Button color='blue' basic >
              <Icon name='comments' />
            </Button>
            <Label as='a' basic color='blue' pointing='left'>
              {<BadgeUnstyled showZero badgeContent={likeCount}>
        {likeButton}
      </BadgeUnstyled>}
            </Label>
          </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  )
}

export default PostCard