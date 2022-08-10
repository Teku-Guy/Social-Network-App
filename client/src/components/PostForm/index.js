import { ValuesOfCorrectTypeRule } from 'graphql';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../../utils/helpers';

function PostForm() {

  const { values, onChange, onSubmit } = useForm(addThoughtCallback, {
    body: ''
  });

  const [addThought, { error }] = useMutation(CREATE_POST_MUTATION , {
    variables: values,
    update(_, result) {

      values.body = '';
    }
  })

  function addThoughtCallback(){
    addThought();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder= "Hi World!"
          name="body"
          onChange={onChange}
          value={ValuesOfCorrectTypeRule.body}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

export default PostForm;