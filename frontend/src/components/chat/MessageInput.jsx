import * as yup from 'yup';
import * as filter from 'leo-profanity';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useAuth, useSocket } from '../../hooks/index.js';

const MessageInput = () => {
  const { t } = useTranslation();
  const emit = useSocket();
  const channelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const auth = useAuth();
  const { username } = auth.getUser();
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
      const filtered = filter.clean(body);
      try {
        await emit.sendMessage({ body: filtered, channelId, username });
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
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
        <fieldset disabled={formik.isSubmitting}>
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              ref={inputRef}
              required
              type="text"
              name="body"
              aria-label="Новое сообщение"
              placeholder={t('messages.label')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
            />
            <Button variant="group-vertical" className="border-0" type="submit" disabled={!formik.isValid}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="arcs"
              >
                <path d="M10 9l-6 6 6 6" />
                <path d="M20 4v7a4 4 0 0 1-4 4H5" />
              </svg>
              <span className="visually-hidden">{t('messages.send')}</span>
            </Button>
          </InputGroup>
        </fieldset>
      </Form>
    </div>
  );
};

export default MessageInput;
