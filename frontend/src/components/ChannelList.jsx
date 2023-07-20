import { useSelector } from "react-redux";
import { channelsSelectors } from '../slices/channelsSlice.js';
import Channel from "./Channel.jsx";

const ChannelList = () => {
  const channelsIds = useSelector(channelsSelectors.selectIds);
  return (
    <>
      <b>Channels</b>
      {channelsIds.map((id) => <Channel key={id} id={id}/>)}
    </>
  );
};

export default ChannelList;
