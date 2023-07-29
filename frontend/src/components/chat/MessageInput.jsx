import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useSocket } from '../../hooks/index.js';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { Form, Button, InputGroup } from "react-bootstrap";

const MessageInput = () => {
  const { t } = useTranslation();
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
        toast.error(t('toast.network'));
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
        <InputGroup>
          <Form.Control
            ref={inputRef}
            required
            type='text'
            name='body'
            aria-label='Новое сообщение'
            placeholder={t('messages.label')}
            {...formik.getFieldProps('body')}
          />
          <Button type='submit' disabled={!formik.isValid}>{t('messages.send')}</Button>
        </InputGroup>
      </fieldset>
    </Form>
  );
};

export default MessageInput;