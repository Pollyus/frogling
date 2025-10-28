import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React, { useState, useEffect } from 'react';
import api from '../../utils/Api';
import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AboutUs from '../AboutUs/AboutUs';
import TrainersCarousel from '../TrainersCarousel/TrainersCarousel';
import LessonsList from '../Lessons/LessonsList';
import FirstLessonRequirements from '../FirstLessonRequirements/FirstLessonRequirements';
import ProductsList from '../Products/ProductsList';
import Promotions from '../Promotions/Promotions';
import SocialLinks from '../SocialLinks/SocialLinks';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://w1603385.yclients.com/widgetJS';
    script.async = true;
    script.charset = 'UTF-8';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <CurrentUserContext.Provider value={currentUser}>
          <Header />

          <Routes>
            <Route path="/" element={<><AboutUs /><TrainersCarousel /><LessonsList id="lesson-types" /><FirstLessonRequirements /><ProductsList /><Promotions /><SocialLinks /><div id="ycwidget"></div></>} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/trainers" element={<TrainersCarousel />} />
            <Route path="/lessons" element={<LessonsList id="lesson-types" />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/social" element={<SocialLinks />} />
            <Route path="/first" element={<FirstLessonRequirements />} />
            {/* Добавьте маршруты для остальных страниц (blog, contacts и т.д.) */}
          </Routes>
         
        </CurrentUserContext.Provider>
      </BrowserRouter>
      <SocialLinks />  
      <Footer />
      <div id="ycwidget"></div> {/* Контейнер для виджета YClients */}
    </div>
  );
}

export default App;
