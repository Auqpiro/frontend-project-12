import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../../hooks/index.js';
import { channelsActions } from '../../slices/channelsSlice.js';
import { messagesActions } from '../../slices/messagesSlice.js';
import ChannelsBox from './ChannelsBox.jsx';
import routes from '../../utils/routes.js';

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const { token } = auth.getUser();
    axios.get(routes.dataPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        const { channels, messages, currentChannelId } = data;
        dispatch(channelsActions.setDefaultChannel(currentChannelId));
        dispatch(channelsActions.fetchChannels(channels));
        dispatch(messagesActions.fetchMessages(messages));
        setLoading(false);
      })
      .catch(() => {
        auth.logOut();
        toast.error(t('toast.network'));
      });
  }, [dispatch, t, auth]);
  return (
    isLoading
      ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" variant="primary" role="status" />
        </div>
      )
      : <ChannelsBox />
  );
};

export default Main;
