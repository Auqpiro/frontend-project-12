import { useSelector } from "react-redux";
import { channelsSelectors } from '../../slices/channelsSlice.js';
import { messagesSelectors } from '../../slices/messagesSlice.js';

const MessagesBox = () => {
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const nameCurrentChannel = useSelector((state) => {
    const currentChannel = channelsSelectors.selectById(state, currentChannelId);
    return (currentChannel && currentChannel.name) ? currentChannel.name : null;
  });
  const messages = useSelector(messagesSelectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);
  return (
    <>
      <p><b># {nameCurrentChannel}</b></p><span>{messages.length} messages</span>
      {messages.map(({ username, body, id }) => (
        <p key={id}>
          <b>{username}: </b><span>{body}</span>
        </p>
      ))}
    </>
  );
};

export default MessagesBox;