/* Import react library */
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

/* Import react-crop stylesheet */
import 'react-image-crop/dist/ReactCrop.css';

/* Import redux library */
import { Provider } from "react-redux";

/* Import redux persist library */
import { PersistGate } from "redux-persist/integration/react";

/* Import rudux store and persister */
import { store, persistor } from './redux/store/store';

/* Import scenes */
import HomePage from 'scenes/homePage.jsx';
import LoginPage from 'scenes/loginPage.jsx';
import UserProfilePage from 'scenes/userProfilePage.jsx';
import RegisterPage from 'scenes/registerPage.jsx';
import AboutPage from 'scenes/aboutPage.jsx';
import MessagePage from 'scenes/messagePage';
import SettingPage from 'scenes/settingPage';
import OtherUserProfilePage from 'scenes/OtherUserProfilePage';
import InboxPage from 'scenes/inboxPage';


function App() {
  return (
    <div className="App">
      <Toaster toastOptions={{className: 'custom-toast',}} />
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

                {/* Route to User Profile Page */}
                <Route path='/profile/:userId' element={<UserProfilePage />} />

                {/* Route to Other User Profile Page */}
                <Route path='/profile/other/:profileId' element={<OtherUserProfilePage />} />

                {/* Route to Message Page */}
                <Route path='/message' element={<MessagePage />} />

                {/* Route to Inbox Page */}
                <Route path='/inbox/:userId' element={<InboxPage />} />

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
