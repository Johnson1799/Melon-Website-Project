/* Import React */
import React, { useState, version } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

/* Import Redux-Persist */
import { PersistGate } from "redux-persist/integration/react";

/* Import React-Rudex */
import { Provider } from "react-redux";

/* Import scenes files*/
import HomePage from 'scenes/homePage.jsx';
import LoginPage from 'scenes/loginPage.jsx';
import ProfilePage from 'scenes/profilePage.jsx';

/* Import rudux store and persister */
import { store, persistor } from '../src/redux/store.js';

/* Import mui */
import { Login } from '@mui/icons-material';


function App() {
  return (
    <div className="App">
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <BrowserRouter>
            <Routes>
              {/* Route to Login Page */}
              <Route path='/' element={<LoginPage />} />

              {/* Route to Home Page */}
              <Route path='/home' element={<HomePage />} />

              {/* Route to Profile Page */}
              <Route path='/profile/:userId' element={<ProfilePage />} />

            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
