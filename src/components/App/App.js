import { Routes, Route } from 'react-router-dom'; /*, Navigate, useNavigate*/
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../Brouse/ProtectedRoute';
import React, { useState, useEffect } from 'react';
import api from '../../utils/Api';
import './App.css';


// import EditProfilePopup from './EditProfilePopup';
// import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from '../Card/AddPlacePopup';
// import InfoTooltip from './InfoTooltip';
import ImagePopup from '../Card/ImagePopup';
// import Register from './Register';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import Login from './Login';
import Main from '../Main/Main';
import TrainersCarousel from '../TrainersCarousel/TrainersCarousel';
import ProductsList from '../Products/ProductsList'
import SocialLinks from '../SocialLinks/SocialLinks';
import Promotions from '../Promotions/Promotions'
import AboutUs from '../AboutUs/AboutUs'
import LessonsList from '../Lessons/LessonsList';
import FirstLessonRequirements from '../FirstLessonRequirements/FirstLessonRequirements';
// import * as auth from '../utils/auth';
// import api from '../utils/Api';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
//   const [isSignIn, setIsSignIn] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => { 
        // Создаем скрипт
        const script = document.createElement('script');
        script.src = 'https://w1603385.yclients.com/widgetJS';
        script.async = true;
        script.charset = 'UTF-8';

        // Добавляем скрипт в body
        document.body.appendChild(script);

        // Функция очистки, чтобы удалить скрипт при размонтировании компонента
        return () => {
            document.body.removeChild(script);
        };
    }, []);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsOpenInfoTooltip(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .likeCardAndUnLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => console.log(err));
  };

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleAddPlaceSubmit(userCard) {
    api
      .createNewCard(userCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };



  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>

        <Header
        //   isLoggedIn={isLoggedIn}
        //   email={userData.email}
        //   logOut={logOut}
        />
        <AboutUs/>
        <TrainersCarousel />
        <LessonsList id="lesson-types"/>        
        <FirstLessonRequirements/>
        <ProductsList/>
        <Promotions/>

        <SocialLinks/>
        <div id="ycwidget"></div> {/* Контейнер для виджета YClients */}
        

      </CurrentUserContext.Provider >
      <Footer />
    </>
  );
};

export default App;