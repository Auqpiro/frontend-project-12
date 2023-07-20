import { useSelector } from "react-redux";
import { channelsSelectors } from '../slices/channelsSlice.js';

const Channel = ({ id }) => {
  const { name } = useSelector((state) => channelsSelectors.selectById(state, id));
  return (
    <>
      <p># {name}</p>
    </>
  );
};

export default Channel;
