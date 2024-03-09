/* Import React */
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

/* Import Redux-Persist */
import { PersistGate } from "redux-persist/integration/react";

/* Import React-Rudex */
import { useSelector, Provider } from "react-redux";

/* Import scenes files*/
import HomePage from 'scenes/homePage.jsx';
import LoginPage from 'scenes/loginPage.jsx';
import ProfilePage from 'scenes/profilePage.jsx';
import RegisterPage from 'scenes/registerPage.jsx';
import AboutPage from 'scenes/aboutPage.jsx';
import MessagePage from 'scenes/messagePage';
import SettingPage from 'scenes/settingPage';

/* Import rudux store and persister */
import { store, persistor } from '../src/redux/store.js';


function App() {
  return (
    <div className="App">
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <BrowserRouter>
              <Routes>
                {/* Route to Login Page */}
                <Route path='/' element={<LoginPage />} />

                {/* Route to About Page */}
                <Route path='/about' element={<AboutPage />}/>

                {/* Route to Register Page */}
                <Route path='/register' element={<RegisterPage />} />

                {/* Route to Home Page */}
                <Route path='/home' element={<HomePage />} />

                {/* Route to Profile Page */}
                <Route path='/profile' element={<ProfilePage />} />

                {/* Route to Message Page */}
                <Route path='/message' element={<MessagePage />} />

                {/* Route to Setting Page */}
                <Route path='/setting' element={<SettingPage />} />

              </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
