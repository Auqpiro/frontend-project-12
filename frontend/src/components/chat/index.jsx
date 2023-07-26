import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { channelsActions } from '../../slices/channelsSlice.js';
import { messagesActions } from '../../slices/messagesSlice.js';
import { Spinner } from 'react-bootstrap';
import ChannelsBox from './ChannelsBox.jsx';
import routes from '../../routes.js';

const Main = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = JSON.parse(localStorage.getItem('userId'));
      const { data } = await axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { channels, messages, currentChannelId } = data;
      dispatch(channelsActions.setDefaultChannel(currentChannelId));
      dispatch(channelsActions.fetchChannels(channels));
      dispatch(messagesActions.fetchMessages(messages));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  return (
    isLoading
      ? <Spinner animation='border' />
      : <ChannelsBox />
  );
};

export default Main;