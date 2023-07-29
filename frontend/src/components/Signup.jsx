import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, useAutoFocus } from '../hooks/index.js';
import { toast } from 'react-toastify';
import { Card, Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import routes from '../routes.js';

const Signup = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [registryFailed, setRegistryFailed] = useState(false);
  const inputRef = useAutoFocus();
  const location = useLocation();
  const { from } = location.state;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required(t('signup.rules.required'))
        .min(3, t('signup.rules.username'))
        .max(20, t('signup.rules.username')),
      password: yup
        .string()
        .required(t('signup.rules.required'))
        .min(6, t('signup.rules.password')),
      confirmPassword: yup
        .string()
        .required(t('signup.rules.required'))
        .min(6, t('signup.rules.password'))
        .oneOf([yup.ref('password')], t('signup.rules.confirmPassword')),
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
        } else {
          toast.error(t('toast.network'));
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
              <h1>{t('signup.header')}</h1>
              <Form onSubmit={formik.handleSubmit}>
                <fieldset disabled={formik.isSubmitting}>
                  <FloatingLabel
                    controlId='username'
                    label={t('signup.username')}
                  >
                    <Form.Control
                      ref={inputRef}
                      required
                      type='text'
                      name='username'
                      autoComplete='username'
                      placeholder={t('signup.rules.username')}
                      {...formik.getFieldProps('username')}
                      isInvalid={(formik.touched.username && formik.errors.username) || registryFailed}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div className='invalid-tooltip'>{formik.errors.username}</div>
                    ): null}
                  </FloatingLabel>
                  <FloatingLabel
                    controlId='password'
                    label={t('signup.password')}
                  >
                    <Form.Control
                      required
                      type='password'
                      name='password'
                      autoComplete='new-password'
                      placeholder={t('signup.rules.password')}
                      {...formik.getFieldProps('password')}
                      isInvalid={(formik.touched.password && formik.errors.password) || registryFailed}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className='invalid-tooltip'>{formik.errors.password}</div>
                    ): null}
                  </FloatingLabel>
                  <FloatingLabel
                    controlId='confirmPassword'
                    label={t('signup.confirmPassword')}
                  >
                    <Form.Control
                      required
                      type='password'
                      name='confirmPassword'
                      autoComplete='new-password'
                      placeholder={t('signup.rules.confirmPassword')}
                      {...formik.getFieldProps('confirmPassword')}
                      isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword) || registryFailed}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className='invalid-tooltip'>{formik.errors.confirmPassword}</div>
                    ): null}
                    {registryFailed ? <div className='invalid-tooltip'>{t('signup.error')}</div> : null}
                  </FloatingLabel>
                  <Button type='submit'>{t('signup.submit')}</Button>
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