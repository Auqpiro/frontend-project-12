import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, useAutoFocus } from '../hooks/index.js';
import { toast } from 'react-toastify';
import { Card, Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import routes from '../routes.js';

const Login = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const inputRef = useAutoFocus();
  const location = useLocation();
  const { from } = location.state;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
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
              <Form onSubmit={formik.handleSubmit}>
                <fieldset disabled={formik.isSubmitting}>
                  <h1>{t('signin.header')}</h1>
                  <FloatingLabel
                    controlId='username'
                    label={t('signin.username')}
                  >
                    <Form.Control
                      ref={inputRef}
                      required
                      type='text'
                      name='username'
                      autoComplete='username'
                      placeholder={t('signin.username')}
                      {...formik.getFieldProps('username')}
                      isInvalid={authFailed}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId='password'
                    label={t('signin.password')}
                  >
                    <Form.Control
                      required
                      type='password'
                      name='password'
                      autoComplete='current-password'
                      placeholder={t('signin.password')}
                      {...formik.getFieldProps('password')}
                      isInvalid={authFailed}
                    />
                    {authFailed ? <div className='invalid-tooltip'>{t('signin.error')}</div> : null}
                  </FloatingLabel>
                  <Button type='submit'>{t('signin.submit')}</Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer>
              <span>{t('signin.footer.message')}</span>
              <Link to='/signup' state={{ from }}>{t('signin.footer.link')}</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;