import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../../utils/mutations';
import { FETCH_ALL_POSTS_QUERY } from '../../utils/queries';
import MyPopup from '../../utils/MyPopup';

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen]= useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy){
      setConfirmOpen(false);
      if(!commentId) {
        const oldData = proxy.readQuery({
          query: FETCH_ALL_POSTS_QUERY
        });
        const newData = oldData.getPosts.filter((t) => t.id !== postId);
        proxy.writeQuery({ query: FETCH_ALL_POSTS_QUERY, data: {getPosts: newData} });
      }
      if(callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });

  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete post'} >
        <Button as="div" color="red" floated="right" onClick={()=> setConfirmOpen(true)} >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm open={confirmOpen} onClick={()=> setConfirmOpen(false)} onConfirm={deletePostOrMutation} />
    </>
  );
}

export default DeleteButton;