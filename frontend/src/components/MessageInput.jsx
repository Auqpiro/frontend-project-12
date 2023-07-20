import { useState, useEffect, useRef } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const MessageInput = () => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage('');
  };
  const onChange = (e) => setMessage(e.target.value);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <FloatingLabel
          controlId='message'
          label='Message'
        >
          <Form.Control
            required
            type='text'
            name='message'
            placeholder='Message'
            value={message}
            onChange={onChange}
            ref={inputRef}
          />
        </FloatingLabel>
      </Form.Group>
      <Button type='submit'>Send</Button>
    </Form>
  );
};

export default MessageInput;