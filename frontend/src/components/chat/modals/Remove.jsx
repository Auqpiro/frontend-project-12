import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSocket, useAutoFocus } from '../../../hooks/index.js';

const Remove = ({ item, onHide }) => {
  const { t } = useTranslation();
  const emit = useSocket();
  const btnRef = useAutoFocus();
  const formik = useFormik({
    initialValues: item,
    onSubmit: async (value) => {
      try {
        await emit.removeChannel(value);
        onHide();
        toast.success(t('toast.remove'));
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
        <Modal.Title>{t('modals.headers.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.concern')}</p>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset className="d-flex justify-content-end" disabled={formik.isSubmitting}>
            <Button className="me-2" variant="secondary" onClick={onHide}>{t('modals.buttons.cancel')}</Button>
            <Button variant="danger" type="submit" ref={btnRef}>{t('modals.buttons.delete')}</Button>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
