import { useState } from 'react';
import { auth } from 'firebaseApp';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';

import Router from './components/Router';

import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader';

function App() {
  const [init, setInit] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    setIsAuthenticated(!!user);
    setInit(true);
  });

  return (
    <>
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      <ToastContainer />
    </>
  );
}

export default App;
