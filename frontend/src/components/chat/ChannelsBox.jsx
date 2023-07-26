import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getModal from "./modals/index.js";
import { channelsSelectors, channelsActions } from '../../slices/channelsSlice.js';
import { Container, Row, Col, Nav, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import MessagesBox from './MessagesBox.jsx';
import MessageInput from './MessageInput.jsx';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const selectCurrentChannel = (id) => dispatch(channelsActions.selectCurrentChannel(Number(id)));
  const channels = useSelector(channelsSelectors.selectAll);
  const [modalInfo, setModalInfo] = useState({
    type: null,
    item: null,
  });
  const hideModal = () => setModalInfo({
    type: null,
    item: null,
  });
  const showModal = (type, item = null) => setModalInfo({ type, item });
  return (
    <>
      <Container>
        <Row>
          <Col>
            <b>Channels</b>
            <Button onClick={() => showModal('adding')}>+</Button>
            <Nav
              fill
              className="flex-column"
              variant="pills"
            >
              {channels.map(({ id, name, removable }) => (
                <Nav.Item  key={id}>
                  {removable
                    ?
                    <Dropdown as={ButtonGroup}>
                      <Button variant={(id === currentChannelId ? 'primary' : null)} onClick={() => selectCurrentChannel(id)}>{name}</Button>
                      <Dropdown.Toggle variant={(id === currentChannelId ? 'primary' : null)} split />
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => showModal('renaming', { id, name })}>Rename</Dropdown.Item>
                        <Dropdown.Item onClick={() => showModal('removing', { id })}>Remove</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    : <Button variant={(id === currentChannelId ? 'primary' : null)} onClick={() => selectCurrentChannel(id)}>{name}</Button>
                  }
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col>
            <MessagesBox />
            <MessageInput />
          </Col>
        </Row>
      </Container>
      {modalInfo.type && getModal(modalInfo, hideModal)}
    </>
  );
};

export default ChannelsBox;