import React, { useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import PropTypes from 'prop-types';

import { LIKE_POST_MUTATION } from '../../utils/mutations';

function LikeButton( { user, post: { id, likeCount, likes}} ){
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if(user && likes.find(like => like.username === user.data.username)){
      setLiked(true)
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {postId: id}
  })

  const login = () => {
    window.location.assign('/login');
  }

  let likeButton;
  if (!user) {
    likeButton = (
      <IconButton onClick={login}>
        <FavoriteBorderIcon />
      </IconButton>
    );
  } else if (liked) {
    likeButton = (
      <IconButton onClick={likePost}>
        <FavoriteIcon />
      </IconButton>
    );
  } else {
    likeButton = (
      <IconButton onClick={likePost}>
        <FavoriteBorderIcon />
      </IconButton>
    );
  }

  return (
      <Badge showZero badgeContent={likeCount} color="primary">
        {likeButton}
      </Badge>
  );
}
LikeButton.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired
  }),
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default LikeButton;