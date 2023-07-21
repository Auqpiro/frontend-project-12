import { useFormik } from 'formik';
import { useRef, useEffect, useContext, useState } from 'react';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import { AuthContext } from '../context/index.js';

const Login = () => {
  const auth = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required(),
      password: yup
        .string()
        .required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <FloatingLabel
                controlId='username'
                label='Name'
              >
                <Form.Control
                  required
                  type='text'
                  name='username'
                  placeholder='Name'
                  autoComplete='username'
                  isInvalid={authFailed}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  ref={inputRef}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId='password'
                label='Password'
              >
                <Form.Control
                  required
                  type='password'
                  name='password'
                  placeholder='Password'
                  autoComplete='current-password'
                  isInvalid={authFailed}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button type='submit'>Login</Button>
          </fieldset>
        </Form>
      </Card.Body>
      <Card.Footer>
        <span>Registration</span>
      </Card.Footer>
    </Card>
  );
};

export default Login;