import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';

import Auth from '../../utils/auth';
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteButton';
import MyPopup from '../../utils/MyPopup';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {

  const {data: user} = Auth.getProfile();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
      />
      <Avatar src={'https://i.pravatar.cc/300'} />
      <CardContent>
        <Typography>
          {username}
        </Typography>
        <Typography as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <LikeButton user={user} post={{id, likes, likeCount }} />
        <BadgeUnstyled showZero badgeContent={commentCount}>
          <IconButton>
            <ChatBubbleOutlineIcon />
          </IconButton>
        </BadgeUnstyled>
      </CardActions>
    </Card>
  )
}

export default PostCard