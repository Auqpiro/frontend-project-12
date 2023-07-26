import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { useSocket, useAutoFocus } from '../../../hooks/index.js';
import { channelsActions, channelsSelectors } from "../../../slices/channelsSlice.js";
import { Button, Form, Modal } from "react-bootstrap";

const Add = ({ onHide }) => {
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
        .required()
        .min(3)
        .notOneOf(channelsNames),
    }),
    onSubmit: async (value) => {
      try {
        const { id } = await emit.createChannel(value);
        dispatch(channelsActions.selectCurrentChannel(id));
        onHide();
      } catch (err) {
        formik.setSubmitting(false);
        formik.resetForm();
        throw err;
      }
    },
  });
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='name'
                  id='name'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  ref={inputRef}
                  isInvalid={formik.errors.name && formik.touched.name}
                />
                <Form.Control.Feedback type='invalid'>Wrong!</Form.Control.Feedback>
            </Form.Group>
            <Button variant='secondary' onClick={onHide}>Cancel</Button>
            <Button variant='primary' type='submit'>Send</Button>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;