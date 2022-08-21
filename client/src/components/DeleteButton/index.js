import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { DELETE_POST_MUTATION, DELETE_REACTION_MUTATION } from '../../utils/mutations';
import { FETCH_THOUGHTS_QUERY } from '../../utils/queries';

function DeleteButton({ thoughtId, reactionId, callback }) {
  const [confirmOpen, setConfirmOpen]= useState(false);

  const mutation = reactionId ? DELETE_REACTION_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy){
      setConfirmOpen(false);
      if(!reactionId) {
        const oldData = proxy.readQuery({
          query: FETCH_THOUGHTS_QUERY
        });
        const newData = oldData.getThoughts.filter((t) => t.id !== thoughtId);
        console.log(newData);
        proxy.writeQuery({ query: FETCH_THOUGHTS_QUERY, data: {getThoughts: newData} });
      }
      if(callback) callback();
    },
    variables: {
      thoughtId,
      reactionId
    }
  });

  return (
    <>
      <Button as="div" color="red" floated="right" onClick={()=> setConfirmOpen(true)} >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm open={confirmOpen} onClick={()=> setConfirmOpen(false)} onConfirm={deletePostOrMutation} />
    </>
  );
}

export default DeleteButton;