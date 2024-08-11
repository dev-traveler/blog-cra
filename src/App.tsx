import { useState } from 'react';
import { auth } from 'firebaseApp';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';

import Router from './components/Router';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    setIsAuthenticated(!!user);
  });

  return (
    <>
      <Router isAuthenticated={isAuthenticated} />;
      <ToastContainer />
    </>
  );
}

export default App;
