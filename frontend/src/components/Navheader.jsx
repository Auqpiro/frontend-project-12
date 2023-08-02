import {
  Container,
  Navbar,
  Button,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth, useLocalStorage, useTheme } from '../hooks/index.js';

const ThemeToggle = () => {
  const { theme, lightOn, lightOff } = useTheme();
  return (
    theme.name === 'dark'
      ? (
        <Button className="me-2 p-1 rounded-circle" onClick={lightOn}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="26"
            width="26"
          >
            <path d="M17 12 A5 5 0 0 1 12 17 A5 5 0 0 1 7 12 A5 5 0 0 1 17 12 z" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </Button>
      )
      : (
        <Button className="me-2 p-1 rounded-circle" onClick={lightOff}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="26"
            width="26"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </Button>
      )
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn
      ? <Button className="py-1" onClick={auth.logOut}>{t('logout')}</Button>
      : null
  );
};

const Navheader = () => {
  const { t, i18n } = useTranslation();
  const { setItem } = useLocalStorage('language');
  const handleSelect = (lng) => {
    i18n.changeLanguage(lng);
    setItem(lng);
  };
  const { languages } = i18n;
  return (
    <Navbar className="shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand className="mt-2 mb-1 h1" as={Link} to="/">
          <Navbar.Toggle className="me-2 mb-1 py-1 px-1">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              height="28"
              width="28"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.5 6.5h12M4.498 10.5h11.997M4.5 14.5h11.995" />
              </g>
            </svg>
          </Navbar.Toggle>
          {t('brand')}
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav onSelect={handleSelect}>
            <Nav.Item>
              <ThemeToggle />
            </Nav.Item>
            <NavDropdown title={i18n.language.toUpperCase()} className="me-2">
              {languages.map((language) => (
                <NavDropdown.Item
                  key={language}
                  eventKey={language}
                >
                  {language.toUpperCase()}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Navheader;
