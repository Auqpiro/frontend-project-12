import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Nav,
  Dropdown,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { channelsSelectors, channelsActions } from '../../slices/channelsSlice.js';
import { showModal } from '../../slices/modalsSlice.js';
import MessagesBox from './MessagesBox.jsx';
import MessageInput from './MessageInput.jsx';
import Modal from './modals/index.js';

const ChannelsBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectCurrentChannel = (id) => dispatch(channelsActions.selectCurrentChannel(Number(id)));
  const handleShow = (type, item = null) => dispatch(showModal({ type, item }));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsRef = useRef(null);
  useEffect(() => {
    channelsRef.current
      ?.querySelector('.btn-primary')
      ?.scrollIntoView();
  }, [channels]);
  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 flex-md-row">
          <Col className="col-4 col-md-2 border-end px-0 flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 pe-2 ps-4 p-4">
              <b>{t('channels.header')}</b>
              <Button className="p-0 text-primary" variant="group-vertical" onClick={() => handleShow('add')}>
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="20"
                  width="20"
                >
                  <path d="M14 1a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1h12zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" />
                  <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
                </svg>
                <span className="visually-hidden">+</span>
              </Button>
            </div>
            <Nav
              ref={channelsRef}
              fill
              variant="pills"
              className="flex-column px-2 overflow-auto mb-3 h-100 d-block"
            >
              {channels.map(({ id, name, removable }) => (
                <Nav.Item className="w-100" key={id}>
                  {removable
                    ? (
                      <Dropdown as={ButtonGroup} className="d-flex">
                        <Button
                          className="w-100 text-start text-truncate"
                          variant={id === currentChannelId
                            ? 'primary'
                            : null}
                          onClick={() => selectCurrentChannel(id)}
                        >
                          <span className="me-1">{`# ${name}`}</span>
                        </Button>
                        <Dropdown.Toggle
                          split
                          variant={id === currentChannelId
                            ? 'primary'
                            : null}
                        >
                          <span className="visually-hidden">Управление каналом</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleShow('rename', { id, name })}>{t('channels.dropdown.rename')}</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleShow('remove', { id })}>{t('channels.dropdown.remove')}</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )
                    : (
                      <Button
                        className="w-100 text-start text-truncate"
                        variant={(id === currentChannelId ? 'primary' : null)}
                        onClick={() => selectCurrentChannel(id)}
                      >
                        <span className="me-1">{`# ${name}`}</span>
                      </Button>
                    )}
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <MessagesBox />
              <MessageInput />
            </div>
          </Col>
        </Row>
      </Container>
      <Modal />
    </>
  );
};

export default ChannelsBox;
