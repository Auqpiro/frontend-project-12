import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

const Signup = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [registryFailed, setRegistryFailed] = useState(false);
  const inputRef = useAutoFocus();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const navigate = useNavigate();
  const f = useFormik({
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
        auth.logIn(data);
        navigate(from);
      } catch (err) {
        f.setSubmitting(false);
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
    <Container fluid className="h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form className="mt-3 mt-mb-0" onSubmit={f.handleSubmit}>
                <fieldset disabled={f.isSubmitting}>
                  <h1 className="text-center mb-4">{t('signup.header')}</h1>
                  <FloatingLabel
                    className="mb-3"
                    controlId="username"
                    label={t('signup.username')}
                  >
                    <Form.Control
                      ref={inputRef}
                      required
                      type="text"
                      name="username"
                      autoComplete="username"
                      placeholder={t('signup.rules.username')}
                      onChange={f.handleChange}
                      onBlur={f.handleBlur}
                      value={f.values.username}
                      isInvalid={(f.touched.username && f.errors.username) || registryFailed}
                    />
                    {f.touched.username && f.errors.username
                      ? (<div className="invalid-tooltip">{f.errors.username}</div>)
                      : null}
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="password"
                    label={t('signup.password')}
                  >
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder={t('signup.rules.password')}
                      onChange={f.handleChange}
                      onBlur={f.handleBlur}
                      value={f.values.password}
                      isInvalid={(f.touched.password && f.errors.password) || registryFailed}
                    />
                    {f.touched.password && f.errors.password
                      ? (<div className="invalid-tooltip">{f.errors.password}</div>)
                      : null}
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-4"
                    controlId="confirmPassword"
                    label={t('signup.confirmPassword')}
                  >
                    <Form.Control
                      required
                      type="password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder={t('signup.rules.confirmPassword')}
                      onChange={f.handleChange}
                      onBlur={f.handleBlur}
                      value={f.values.confirmPassword}
                      isInvalid={
                        (f.touched.confirmPassword && f.errors.confirmPassword) || registryFailed
                      }
                    />
                    {f.touched.confirmPassword && f.errors.confirmPassword
                      ? (<div className="invalid-tooltip">{f.errors.confirmPassword}</div>)
                      : null}
                    {registryFailed
                      ? (<div className="invalid-tooltip">{t('signup.error')}</div>)
                      : null}
                  </FloatingLabel>
                  <Button className="w-100 mb-3" variant="outline-primary" type="submit">{t('signup.submit')}</Button>
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
