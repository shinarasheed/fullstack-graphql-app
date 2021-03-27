import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks';

const Register = ({ history }) => {
  const [errors, setErrors] = useState({});

  const { onChange, handleOnSubmit, values } = useForm(registerUser, {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const { username, password, email, confirmPassword } = values;

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    //update will be triggered if the mutation is successfuls
    update(_, result) {
      history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  // i want to put a set time out to it

  //variables with the function keyword an actually hoisted
  //they are brought to the top. that is why the function is available up there
  //this is unlike functions with the const keyword
  function registerUser() {
    addUser();
  }

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
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          value={username}
          error={errors.username ? true : false}
          onChange={onChange}
          // type="text"
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          value={email}
          error={errors.email ? true : false}
          onChange={onChange}
          type="email"
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
      {showErrors()}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
