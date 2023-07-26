import Add from "./Add";
import Remove from "./Remove";
import Rename from "./Rename";

const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

const getModal = ({ type, item }, hideModal) => {
  const Component = modals[type];
  return <Component item={item} onHide={hideModal} />;
};

export default getModal;
