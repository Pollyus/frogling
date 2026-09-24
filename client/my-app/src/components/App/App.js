import { Routes, Route, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React, { useState, useEffect } from 'react';
import api from '../../utils/Api';
import './App.css';
import AuthPage from '../Login/Auth/AuthPage';
import ProfilePage from '../Login/Profile/ProfilePage';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AboutUs from '../AboutUs/AboutUs';
import TrainersCarousel from '../TrainersCarousel/TrainersCarousel';
import LessonsList from '../Lessons/LessonsList';
import FirstLessonRequirements from '../FirstLessonRequirements/FirstLessonRequirements';
import ProductsList from '../Products/ProductsList';
import Promotions from '../Promotions/Promotions';
import SocialLinks from '../SocialLinks/SocialLinks';
import PhotoSlider from '../PhotoSlider/PhotoSlider';
import VideoPlay from '../VideoPlay/VideoPlay';
import ActionNewYear from '../ActionNewYear/ActionNewYear';
import SchedulePage from '../Admin/Sсhedule/SсhedulePage';
import ProtectedRoute from '../Login/ProtectedRoute';
import MainLayout from '../Login/MainLayout';
import Service from '../BuyService/ServicesPage'
import AdminPanel from '../Admin/AdminPanel'


function App() {
  const [currentUser, setCurrentUser] = useState({});

  // YClients
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://w1603385.yclients.com/widgetJS';
  //   script.async = true;
  //   script.charset = 'UTF-8';
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const AdminRoute = () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');
    let isAdmin = false;

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        isAdmin = (user.role === 'Admin' || user.Role === 'Admin');
      } catch (e) {
        isAdmin = false;
      }
    }
     // Если админ — показываем панель, иначе перенаправляем на главную
    return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
  };

  return (
    <div>
      <BrowserRouter>
        <CurrentUserContext.Provider value={currentUser}>
          {/* <Header /> */}
          <Routes>

             {/* Публичный маршрут: доступен только для авторизации/регистрации */}
            <Route path="/login" element={<AuthPage />} />
                <Route element={<MainLayout />}>
                <Route path="/" element={<><VideoPlay /><AboutUs /><TrainersCarousel /><LessonsList id="lesson-types" /><FirstLessonRequirements /><PhotoSlider/><ProductsList /><Promotions /><div id="ycwidget"></div></>} />
                <Route path="/video" element={<VideoPlay />} />
                <Route path='/action' element={<ActionNewYear/>}/>
                <Route path="/about" element={<AboutUs />} />
                <Route path="/trainers" element={<TrainersCarousel />} />
                <Route path="/lessons" element={<LessonsList id="lesson-types" />} />
                <Route path="/products" element={<ProductsList />} />
                <Route path="/promotions" element={<Promotions />} />
                {/* <Route path="/social" element={<SocialLinks />} /> */}
                <Route path="/first" element={<FirstLessonRequirements />} />
                <Route path="/photo" element={<PhotoSlider />} />
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminPanel />} />
                </Route>
            {/* Защищенные маршруты: внутрь нельзя попасть без авторизации */}
              <Route element={<ProtectedRoute />}>
              
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/services" element={<Service/>} />

                
                {/* Добавьте маршруты для остальных страниц (blog, contacts и т.д.) */}
              </Route>
              {/* Любой неизвестный адрес перенаправляем на главную (которая проверит логин) */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            
          </Routes>
         
        </CurrentUserContext.Provider>
      </BrowserRouter>
      <SocialLinks />  
      <Footer />
      
    </div>
  );
}

export default App;
