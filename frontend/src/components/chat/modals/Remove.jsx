import { useFormik } from "formik";
import { useSocket, useAutoFocus } from '../../../hooks/index.js';
import { Button, Form, Modal } from "react-bootstrap";


const Remove = ({ item, onHide }) => {
  const emit = useSocket();
  const btnRef = useAutoFocus();
  const formik = useFormik({
    initialValues: item,
    onSubmit: async (value) => {
      try {
        await emit.removeChannel(value);
        onHide();
      } catch (err) {
        formik.setSubmitting(false);
        throw err;
      }
    },
  });
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Button variant='secondary' onClick={onHide}>Cancel</Button>
            <Button variant='danger' type='submit' ref={btnRef}>Send</Button>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;