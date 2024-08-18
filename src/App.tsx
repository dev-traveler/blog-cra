import 'react-toastify/dist/ReactToastify.css';

import { useContext, useEffect, useState } from 'react';
import { auth } from 'firebaseApp';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';

import { ThemeContext } from 'context/ThemeContext';
import Loader from 'components/Loader';
import Router from 'components/Router';

function App() {
  const context = useContext(ThemeContext);

  const [init, setInit] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setInit(true);
    });
  }, []);

  return (
    <div className={context.theme}>
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      <ToastContainer />
    </div>
  );
}

export default App;
