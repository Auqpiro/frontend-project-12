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
  return (
    <>
      <p>
        <b>
          {`# ${nameCurrentChannel}`}
        </b>
      </p>
      <span>{t('messages.counter.count', { count: messages.length })}</span>
      {messages.map(({ username, body, id }) => (
        <p key={id}>
          <b>{`${username}: `}</b>
          <span>{body}</span>
        </p>
      ))}
    </>
  );
};

export default MessagesBox;
