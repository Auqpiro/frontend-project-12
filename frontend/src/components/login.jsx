import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import * as yup from 'yup';

const Login = () => {
  const inputRef = useRef();
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
        .required()
        .min(8)
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
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
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  ref={inputRef}
                ></Form.Control>
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
                  onChange={formik.handleChange}
                  value={formik.values.password}
                ></Form.Control>
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