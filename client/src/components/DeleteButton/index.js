import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { DELETE_POST_MUTATION } from '../../utils/mutations';

function DeleteButton({ thoughtId, callback }) {
  const [confirmOpen, setConfirmOpen]= useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(){
      setConfirmOpen(false);
      // TODO:remove from cache
      if(callback) callback();
    },
    variables: {
      thoughtId
    }
  });

  return (
    <>
      <Button as="div" color="red" floated="right" onClick={()=> setConfirmOpen(true)} >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm open={confirmOpen} onClick={()=> setConfirmOpen(false)} onConfirm={deletePost} />
    </>
  );
}

export default DeleteButton;