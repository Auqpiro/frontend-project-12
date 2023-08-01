import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSocket, useAutoFocus } from '../../../hooks/index.js';
import { channelsActions, channelsSelectors } from '../../../slices/channelsSlice.js';

const Add = ({ onHide }) => {
  const { t } = useTranslation();
  const inputRef = useAutoFocus();
  const emit = useSocket();
  const dispatch = useDispatch();
  const channelsNames = useSelector(channelsSelectors.selectAll).map(({ name }) => name);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
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
        const { id } = await emit.createChannel(value);
        dispatch(channelsActions.selectCurrentChannel(id));
        onHide();
        toast.success(t('toast.add'));
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
        <Modal.Title>{t('modals.headers.add')}</Modal.Title>
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

export default Add;
