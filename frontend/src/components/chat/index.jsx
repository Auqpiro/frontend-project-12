import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { channelsActions } from '../../slices/channelsSlice.js';
import { messagesActions } from '../../slices/messagesSlice.js';
import ChannelsBox from './ChannelsBox.jsx';
import routes from '../../routes.js';

const Main = () => {
  const { t } = useTranslation();
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
    try {
      fetchData();
    } catch (err) {
      toast.error(t('toast.network'));
      throw err;
    }
  }, [dispatch, t]);
  return (
    isLoading
      ? <Spinner animation="border" />
      : <ChannelsBox />
  );
};

export default Main;
