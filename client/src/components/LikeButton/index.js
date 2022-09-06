import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';

import { LIKE_POST_MUTATION } from '../../utils/mutations';
import MyPopup from '../../utils/MyPopup';

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
    <IconButton as={Link} to="/login">
      <FavoriteBorderIcon />
    </IconButton>
  )

  return (
      <BadgeUnstyled showZero badgeContent={likeCount}>
        {likeButton}
      </BadgeUnstyled>
  );
}

export default LikeButton;