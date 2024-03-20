import React, { useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import NotificationBox from './NotificationBox';


const NotificationBoxButton: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem('userInfo'));

  const handleButtonClick = () => {
    // Popup only available for logged in users
    if (!isLoggedIn) {
      alert('Du må være logget inn for å se notifikasjoner');
      return;
    }
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className='notificationBoxButtonDiv'>
      {isLoggedIn && <IoIosNotificationsOutline onClick={handleButtonClick} className='notificationBoxButton' />}
      {isLoggedIn && isPopupOpen && <NotificationBox />}
    </div>
  );
};

export default NotificationBoxButton;
