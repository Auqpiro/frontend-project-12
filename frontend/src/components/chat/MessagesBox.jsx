import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsSelectors } from '../../slices/channelsSlice.js';
import { messagesSelectors } from '../../slices/messagesSlice.js';

const MessagesBox = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const nameCurrentChannel = useSelector((state) => {
    const currentChannel = channelsSelectors.selectById(state, currentChannelId);
    return (currentChannel && currentChannel.name) ? currentChannel.name : null;
  });
  const messages = useSelector(messagesSelectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);

  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current
      ?.lastElementChild
      ?.scrollIntoView({ block: 'start', behavior: 'auto' });
  }, [currentChannelId, messages]);
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${nameCurrentChannel}`}
          </b>
        </p>
        <span className="text-muted">{t('messages.counter.count', { count: messages.length })}</span>
      </div>
      <div ref={messagesRef} className="chat-messages overflow-auto px-5">
        {messages.map(({ username, body, id }) => (
          <div className="text-break mb-2" key={id}>
            <b>{`${username}: `}</b>
            <span>{body}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MessagesBox;
