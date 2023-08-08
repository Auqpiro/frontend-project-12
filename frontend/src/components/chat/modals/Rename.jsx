import * as yup from 'yup';
import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSocket } from '../../../hooks/index.js';
import { channelsSelectors } from '../../../slices/channelsSlice.js';
import { hideModal } from '../../../slices/modalsSlice.js';

const Rename = () => {
  const { item } = useSelector((state) => state.modals);
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const emit = useSocket();
  const dispatch = useDispatch();
  const onHide = () => dispatch(hideModal());
  const channelsNames = useSelector(channelsSelectors.selectAll).map(({ name }) => name);
  const formik = useFormik({
    initialValues: item,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .trim()
        .required(t('modals.rules.required'))
        .min(3, t('modals.rules.name'))
        .max(20, t('modals.rules.name'))
        .notOneOf(channelsNames, t('modals.rules.uniq')),
    }),
    onSubmit: async (value) => {
      try {
        await emit.renameChannel(value);
        onHide();
        toast.success(t('toast.rename'));
      } catch (err) {
        formik.setSubmitting(false);
        toast.error(t('toast.network'));
        throw err;
      }
    },
  });
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.headers.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group controlId="name">
              <Form.Label visuallyHidden>Имя канала</Form.Label>
              <Form.Control
                className="mb-2"
                ref={inputRef}
                required
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                isInvalid={formik.errors.name && formik.touched.name}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" onClick={onHide}>{t('modals.buttons.cancel')}</Button>
              <Button variant="primary" type="submit">{t('modals.buttons.submit')}</Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
