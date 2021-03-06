import { gql, useQuery } from '@apollo/client';
import React from 'react';
import './App.css';

const profileQuery = gql`
  query($username: String!, $first: Int!) {
    user(login: $username) {
      avatarUrl
      company

      repositories(
        first: $first
        orderBy: { field: UPDATED_AT, direction: ASC }
      ) {
        nodes {
          id
          name
          updatedAt
        }
      }
    }
  }
`;

function App() {
  const username = window.location.pathname.replace('/', '');
  const limit = parseInt(window.location.search.replace('?first=', ''));
  const { loading, error, data } = useQuery(profileQuery, {
    variables: { first: limit, username },
  });

  if (loading) return 'Loading...';
  if (error) return 'Something went wrong';

  return (
    <div className="App">
      <img src={data.user.avatarUrl} height="200" alt="Profile" />
      <p>{data.user.company}</p>
      <ul>
        {data.user.repositories.nodes.map((repo) => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
