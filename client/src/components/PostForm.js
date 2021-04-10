import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';

import { FETCH_POST_QUERY } from '../utils/graphql';

const PostForm = () => {
  const { values, onChange, handleOnSubmit } = useForm(createPostCallBack, {
    body: '',
  });

  //I am having an unhandled promise rejection error when post body is empty
  //promise can either resolve or reject. promise rejection is when the promise fails
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });

      //this throws errors and I do not really understand this part

      // data.getPosts = [result.data.createPost, ...data.getPosts];
      // proxy.writeQuery({ query: FETCH_POST_QUERY, data });

      //stackoverflow solution
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });

      values.body = '';
    },
  });

  function createPostCallBack() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <h2>Create a post</h2>
        <Form.Field>
          <Form.Input
            placeholder="create post"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: '20px' }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
