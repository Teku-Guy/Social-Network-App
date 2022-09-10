import React, { useState } from 'react';
import { Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../../utils/mutations';
import { FETCH_ALL_POSTS_QUERY } from '../../utils/queries';
import MyPopup from '../../utils/MyPopup';

function DeleteButton({ postId, commentId, callback }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy){
      handleClose();
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
      <IconButton color='error' onClick={handleOpen} sx={{m:2}} >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Are You Sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once done this action is non revisible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button  color='error' onClick={deletePostOrMutation}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton;