import React, { useContext } from "react";
import { Card, CardActions, CardContent, CardMedia, Typography, Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Badge from '@mui/material/Badge';

import { AuthContext } from "../../utils/AuthContext";
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteButton';

function PostCard({
  post: { body, createdAt, id, likeCount, commentCount, likes, user, username, profileImgUrl }
}) {
  // Current logged-in user from context (may be undefined)
  const { user: currentUser } = useContext(AuthContext) || {};

  // Support both shapes: nested `user` OR flattened fields on Post
  const authorUsername = user?.username ?? username ?? 'Unknown';
  const authorAvatar = user?.profileImgUrl ?? profileImgUrl ?? '';

  const toComment = () => {
    window.location.assign(`/posts/${id}`);
  };

  return (
    <Card sx={{ maxWidth: "400px", margin: 'auto' }}>
      <CardMedia
        component="img"
        alt="post image"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
      />
      <Avatar sx={{
        width: 50,
        height: 50,
        border: '2px solid #121212',
        margin: '-48px 32px 0 auto',
        '& > img': { margin: 0 }
      }}
      src={authorAvatar}
      />
      <CardContent sx={{ padding: "24px" }}>
        <Typography variant="subtitle1">
          {authorUsername}
        </Typography>
        <Typography variant="subtitle2" component={Link} to={`/posts/${id}`} sx={{ textDecoration: 'none' }} color='secondary'>
          {moment(createdAt).fromNow(true)}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: "24px" }}>
        <LikeButton user={currentUser} post={{ id, likes, likeCount }} />
        <Badge showZero badgeContent={commentCount} color="primary">
          <IconButton onClick={toComment}>
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Badge>
        {currentUser && currentUser.username === authorUsername && (
          <DeleteButton postId={id} />
        )}
      </CardActions>
    </Card>
  );
}

export default PostCard;