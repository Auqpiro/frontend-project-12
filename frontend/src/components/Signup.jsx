import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';
import { Card, Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import routes from '../routes.js';

const Signup = () => {
  const auth = useAuth();
  const [registryFailed, setRegistryFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const { from } = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required()
        .min(3)
        .max(20),
      password: yup
        .string()
        .required()
        .min(6),
      confirmPassword: yup
        .string()
        .required()
        .min(6)
        .oneOf([yup.ref('password')]),
    }),
    onSubmit: async ({ username, password }) => {
      setRegistryFailed(false);
      try {
        const { data } = await axios.post(routes.createPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setRegistryFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h1>Registration</h1>
              <Form onSubmit={formik.handleSubmit}>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group>
                    <FloatingLabel
                      controlId='username'
                      label='3 to 20 characters'
                    >
                      <Form.Control
                        required
                        type='text'
                        name='username'
                        placeholder='Username'
                        autoComplete='username'
                        isInvalid={registryFailed}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        ref={inputRef}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group>
                    <FloatingLabel
                      controlId='password'
                      label='at least 6 characters'
                    >
                      <Form.Control
                        required
                        type='password'
                        name='password'
                        placeholder='Password'
                        autoComplete='new-password'
                        isInvalid={registryFailed}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group>
                    <FloatingLabel
                      controlId='confirmPassword'
                      label='must match'
                    >
                      <Form.Control
                        required
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm password'
                        autoComplete='new-password'
                        isInvalid={registryFailed}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        />
                      <Form.Control.Feedback type='invalid'>the username already exist</Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Button type='submit'>Registry</Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;