import { useContext } from "react";
import { useSelector } from "react-redux";
import MessageInput from "./MessageInput.jsx";
import { channelsSelectors } from '../slices/channelsSlice.js';
import { messagesSelectors } from '../slices/messagesSlice.js';
import { ChannelContext } from '../context/index.js';

const MessageBody = () => {
  const channels = useContext(ChannelContext);
  const name = useSelector((state) => {
    const currentChannel = channelsSelectors.selectById(state, channels.selected);
    return (currentChannel && currentChannel.name) ? currentChannel.name : null;
  });
  const messages = useSelector(messagesSelectors.selectAll);
  return (
    <>
      <b># {name}</b>
      {messages.map(({ body, username, id }) => (
        <p key={id}><b>{username}</b>: {body}</p>
      ))}
      <MessageInput />
    </>
  );
};

export default MessageBody;