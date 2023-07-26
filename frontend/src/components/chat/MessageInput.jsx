import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useSocket } from '../../hooks/index.js';
import { Form, Button } from "react-bootstrap";

const MessageInput = () => {
  const emit = useSocket();
  const channelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup
        .string()
        .trim()
        .required(),
    }),
    onSubmit: async ({ body }) => {
      try {
        await emit.sendMessage({ body, channelId, username });
        formik.resetForm();
      } catch (err) {
        formik.setSubmitting(false);
        throw err;
      }
    },
  });
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [channelId, formik.isSubmitting]);
  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <fieldset disabled={formik.isSubmitting}>
        <Form.Group>
          <Form.Control
            required
            type='text'
            name='body'
            placeholder='Message'
            value={formik.values.body}
            onChange={formik.handleChange}
            isInvalid={formik.errors.body && formik.touched.body}
            ref={inputRef}
          />
          <Form.Control.Feedback type='invalid'>Wrong!</Form.Control.Feedback>
        </Form.Group>
        <Button type='submit'>Send</Button>
      </fieldset>
    </Form>
  );
};

export default MessageInput;