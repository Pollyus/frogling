import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header'; 

export default function MainLayout() {
  return (
    <div className="site-wrapper">
      <Header />
      <div className="page-content">
        <Outlet /> {/* Сюда будут подставляться страницы сайта */}
      </div>
    </div>
  );
}
