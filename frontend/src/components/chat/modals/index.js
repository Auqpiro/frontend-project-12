import { useSelector } from 'react-redux';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  add: Add,
  rename: Rename,
  remove: Remove,
};

const Modal = () => {
  const { type } = useSelector((state) => state.modals);
  const Component = modals[type];
  return type && <Component />;
};

export default Modal;
