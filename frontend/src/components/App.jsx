import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './main.jsx';
import Login from './login.jsx';
import NotFound from './notfound.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} >
          <Route
            index
            element={(
              <div>No page is selected.</div>
            )}
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
