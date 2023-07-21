import { useState, useEffect, useRef, useContext } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { ChannelContext } from "../context/index.js";
import { socket } from "./Chat.jsx";

const MessageInput = () => {
  const channels = useContext(ChannelContext);
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [body, setBodyMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('newMessage', { body, channelId: channels.selected, username }, (res) => {
      console.log(res);
    });
    setBodyMessage('');
  };
  const onChange = (e) => setBodyMessage(e.target.value);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <FloatingLabel
          controlId='message'
          label='Input your message...'
        >
          <Form.Control
            required
            type='text'
            name='message'
            placeholder='Message'
            value={body}
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