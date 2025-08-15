import React, { useContext } from "react";
import { Card, CardActions, CardContent, CardMedia, Typography, Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';

import { AuthContext } from "../../utils/AuthContext";
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteButton';

  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {

  const { user } = useContext(AuthContext);
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
        <Typography variant="subtitle2" as={Link} to={`/posts/${id}`} sx={{ textDecoration: 'none' }} color='secondary'>
          {moment(createdAt).fromNow(true)}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: "24px" }}>
        <LikeButton user={user.data} post={{id, likes, likeCount }} />
        <BadgeUnstyled showZero badgeContent={commentCount}>
          <IconButton onClick={toComment}>
            <ChatBubbleOutlineIcon />
          </IconButton>
        </BadgeUnstyled>
        {user && user.data.username === username && <DeleteButton postId={id} />}
      </CardActions>
    </Card>
  )
}

export default PostCard