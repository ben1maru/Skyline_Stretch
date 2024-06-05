import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false); // Закрити меню після кліку на посилання
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-title">Skyline Stretch</div>
      <div className="burger-menu" onClick={toggleMenu}>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link
          to="/"
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          Головна сторінка
        </Link>
        <Link
          to="/catalog"
          className={`nav-link ${location.pathname === '/catalog' ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          Каталог
        </Link>
        <Link
          to="/contact"
          className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          Контакти
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
