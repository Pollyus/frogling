import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVk,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import { faMap, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './SocialLinks.css';

const SocialLinks = () => {
  return (
    <div className="social-links">
      <a href="https://go.2gis.com/EZNpj" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faMap} />
        <span>2ГИС</span>
      </a>

      <a href="https://vk.com/frogling_kzn" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faVk} />
        <span>VK</span>
      </a>

      <a href="https://t.me/frogling_kzn" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTelegram} />
        <span>Telegram</span>
      </a>
      <a href="tel:+7 953-643-12-12"> {/* Замените на реальный номер */}
        <FontAwesomeIcon icon={faPhone} />
        <span>+7 953-643-12-12</span> {/* Замените на реальный номер */}
      </a>

      <a href="mailto:frogling_kzn@mail.ru"> {/* Замените на реальный email */}
        <FontAwesomeIcon icon={faEnvelope} />
        <span>frogling_kzn@mail.ru</span> {/* Замените на реальный email */}
      </a>
    </div>
    
  );
};

export default SocialLinks;
