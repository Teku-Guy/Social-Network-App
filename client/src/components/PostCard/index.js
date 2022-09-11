import React from 'react';
import { styled } from '@mui/material/styles';
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
  const toComment = () => {
    window.location.assign(`/posts/${id}`);
  };

  return (
    <Card sx={{ maxWidth: "400px", margin: 'auto' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
      />
      <Avatar sx={{
        width: 50,
        height: 50,
        border: '2px solid #121212',
        margin: '-48px 32px 0 auto',
        '& > img': { margin: 0 }}}
        src={'https://i.pravatar.cc/300'}
      />
      <CardContent sx={{ padding: "24px" }}>
        <Typography variant="subtitle1">
          {username}
        </Typography>
        <Typography variant="subtitle2" as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: "24px" }}>
        <LikeButton user={user} post={{id, likes, likeCount }} />
        <BadgeUnstyled showZero badgeContent={commentCount}>
          <IconButton onClick={toComment}>
            <ChatBubbleOutlineIcon />
          </IconButton>
        </BadgeUnstyled>
        {user && user.username === username && <DeleteButton postId={id} />}
      </CardActions>
    </Card>
  )
}

export default PostCard