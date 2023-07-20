import { useSelector } from "react-redux";
import { channelsSelectors } from '../slices/channelsSlice.js';
import { messagesSelectors } from '../slices/messagesSlice.js';
import MessageInput from "./MessageInput.jsx";

const MessageBox = () => {
  const currentChannelId = useSelector((state) => state.currentChannelReducer.currentChannelId);
  const name = useSelector((state) => {
    const channel = channelsSelectors.selectById(state, currentChannelId);
    return (channel && channel.name) ? channel.name : null;
  });
  const messages = useSelector(messagesSelectors.selectAll);
  return (
    <>
      <b># {name}</b>
      <p>{JSON.stringify(messages)}</p>
      <MessageInput />
    </>
  );
};

export default MessageBox;