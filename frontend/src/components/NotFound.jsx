import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center p-5 mt-5">
      <h1 className="h4 text-muted p-5 mt-5">{t('notFound.header')}</h1>
      <span className="text-muted">{t('notFound.message')}</span>
      <Link to="/">{t('notFound.link')}</Link>
    </div>
  );
};

export default NotFound;
