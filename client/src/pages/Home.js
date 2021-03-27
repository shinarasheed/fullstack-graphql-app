import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

const Home = () => {
  const { loading, data } = useQuery(FETCH_POST_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row>
        {' '}
        <h1 className="page-title">Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data !== undefined &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: '1rem' }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
        <Grid.Column></Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POST_QUERY = gql`
  query {
    getPosts {
      id
      username
      body
      createdAt
      likes {
        username
      }
      likeCount
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default Home;
