import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSocket } from '../../../hooks/index.js';
import { useSelector } from 'react-redux';
import { Button, Form, Modal } from "react-bootstrap";
import { channelsSelectors } from "../../../slices/channelsSlice.js";
import { useRef, useEffect } from 'react';

const Rename = ({ item, onHide }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const emit = useSocket();
  const channelsNames = useSelector(channelsSelectors.selectAll).map(({ name }) => name);
  const formik = useFormik({
    initialValues: item,
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
        await emit.renameChannel(value);
        onHide();
      } catch (err) {
        formik.setSubmitting(false);
        inputRef.current.select();
        throw err;
      }
    },
  });
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Rename</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Label htmlFor='name'>New name</Form.Label>
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

export default Rename;