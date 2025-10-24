import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVk,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
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
    </div>
  );
};

export default SocialLinks;
