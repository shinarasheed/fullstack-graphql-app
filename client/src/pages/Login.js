import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

const Login = ({ history }) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, handleOnSubmit, values } = useForm(userLogin, {
    username: '',
    password: '',
  });

  const { username, password } = values;

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    //update will be triggered if the mutation is successfuls
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  //variables with the function keyword an actually hoisted
  //they are brought to the top. that is why the function is available up there
  //this is unlike functions with the const keyword
  function userLogin() {
    loginUser();
  }

  // i want to put a set time out to it
  const showErrors = () => {
    if (Object.keys(errors).length > 0) {
      return (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="form-container">
      <Form
        onSubmit={handleOnSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          value={username}
          error={errors.username ? true : false}
          onChange={onChange}
          type="text"
        />
        <Form.Input
          label="Password"
          placeholder="password"
          name="password"
          value={password}
          error={errors.password ? true : false}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {showErrors()}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
