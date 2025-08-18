import React, { useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';

import { LIKE_POST_MUTATION } from '../../utils/mutations';

function LikeButton( { user, post: { id, likeCount, likes}} ){
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if(user && likes.find(like => like.username === user.username)){
      setLiked(true)
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {postId: id}
  })

  const login = () => {
    window.location.assign('/login');
  }

  const likeButton = user ? (
    liked ? (
      <IconButton onClick={likePost}>
          <FavoriteIcon />
      </IconButton>
    ) : (
      <IconButton onClick={likePost}>
          <FavoriteBorderIcon />
      </IconButton>
    )
  ): (
    <IconButton onClick={login}>
      <FavoriteBorderIcon />
    </IconButton>
  )

  return (
      <Badge showZero badgeContent={likeCount} color="primary">
        {likeButton}
      </Badge>
  );
}

export default LikeButton;