import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchChannels } from '../slices/channelsSlice.js';
import { fetchMessages } from "../slices/messagesSlice.js";
import ChannelList from "./ChannelList.jsx";
import MessageBox from "./MessageBox.jsx";

const Chat = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <ChannelList />
        </Col>
        <Col>
          <MessageBox />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;