import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('notFound.header')}</h1>
      <span>{t('notFound.message')}</span>
      <Link to='/'>{t('notFound.link')}</Link>
    </>
  );
};

export default NotFound;