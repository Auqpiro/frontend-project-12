import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Card,
  Form,
  Button,
  FloatingLabel,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useAuth, useAutoFocus } from '../hooks/index.js';
import routes from '../utils/routes.js';

const Login = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const inputRef = useAutoFocus();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      axios.post(routes.loginPath(), values)
        .then(({ data }) => {
          auth.logIn(data);
          navigate(from);
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
          } else {
            toast.error(t('toast.network'));
          }
        });
    },
  });
  return (
    <Container className="container-fluid h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <fieldset disabled={formik.isSubmitting}>
                  <h1 className="text-center mb-4">{t('signin.header')}</h1>
                  <FloatingLabel
                    className="mb-3"
                    controlId="username"
                    label={t('signin.username')}
                  >
                    <Form.Control
                      ref={inputRef}
                      required
                      type="text"
                      name="username"
                      autoComplete="username"
                      placeholder={t('signin.username')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      isInvalid={authFailed}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-4"
                    controlId="password"
                    label={t('signin.password')}
                  >
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      placeholder={t('signin.password')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={authFailed}
                    />
                    {authFailed ? <div className="invalid-tooltip">{t('signin.error')}</div> : null}
                  </FloatingLabel>
                  <Button className="w-100 mb-3" variant="outline-primary" type="submit">{t('signin.submit')}</Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('signin.footer.message')}</span>
                <Link to="/signup" state={{ from }}>{t('signin.footer.link')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
