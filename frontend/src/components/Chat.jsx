import axios from 'axios';
import { io } from 'socket.io-client';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import routes from '../routes.js';
import { channelsActions } from '../slices/channelsSlice.js';
import { messagesActions } from '../slices/messagesSlice.js';
import ChannelList from "./ChannelList.jsx";
import MessageBody from "./MessageBody.jsx";

export const socket = io('http://localhost:3000');

const Chat = () => {
  const dispatch = useDispatch();
  socket.on('newMessage', (content) => {
    console.log(content);
    dispatch(messagesActions.addMessage(content));
  });
  useEffect(() => {
    console.log('fetch!');
    const fetchData = async () => {
      const { token } = JSON.parse(localStorage.getItem('userId'));
      const { data } = await axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { channels, messages } = data;
      dispatch(channelsActions.fetchChannels(channels));
      dispatch(messagesActions.fetchMessages(messages));
    };
    fetchData();
  }, [dispatch]);
  return (
    <Container>
      <Row>
        <Col>
          <ChannelList />
        </Col>
        <Col>
          <MessageBody />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;