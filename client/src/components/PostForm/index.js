import React from 'react';
import { Box, Button, Input } from '@mui/material';
import { useMutation } from '@apollo/client';

import { FETCH_ALL_POSTS_QUERY } from '../../utils/queries';
import { CREATE_POST_MUTATION } from '../../utils/mutations';
import { useForm } from '../../utils/helpers';

function PostForm() {

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION , {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_ALL_POSTS_QUERY
      });
      proxy.writeQuery({ query: FETCH_ALL_POSTS_QUERY, data: { getPosts: [result.data.addPost, ...data.getPosts]}});
      values.body = '';
    }
  });

  function createPostCallback(){
    createPost();
  }

  return (
    <>
      <Box component={'form'} onSubmit={onSubmit} noValidate autoComplete="off" sx={{ p: 2}}>
        <h2>Create a post:</h2>
          <Input
            placeholder= "Hi World!"
            name="body"
            fullWidth
            onChange={onChange}
            value={values.body}
            error={error ? true : false}  
          />
          <Button type='submit' fullWidth>
            Submit
          </Button>
      </Box>
      {error && (
        <div className="ui error message" style={{marginBottom: 20}}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default PostForm;