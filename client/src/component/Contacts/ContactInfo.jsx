import React from 'react';
import './ContactInfo.css'; // Підключаємо файл стилів
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

export default function ContactInfo() {
  return (
    <>
      <NavBar />
      <div className="contact-info-container">
        <div className="content">
          <div className="text-container">
            <h2>Зв'яжіться з нами</h2>
            <p>Ми завжди раді почути від вас! Якщо у вас є питання, пропозиції або ви бажаєте дізнатися більше про наші послуги, будь ласка, зв'яжіться з нами за допомогою будь-якого зручного для вас способу.</p>
          </div>
         
          <img className="contact-image" src="https://th.bing.com/th/id/OIP.GLmXucfz5hprqc6oyQMrqwHaFj?rs=1&pid=ImgDetMain" alt="Contact" />
       
        </div>
        <hr />
        <div className="contact-title">
          <h1>Контактна інформація</h1>
        </div>
        <div className="contact-address">
            <p>
              Закарпатська область, м. Ужгород пл. Шандора-Петефі, 12
            </p>
          </div>
        <div className="contact-details">

          <div className="contact-phones">
            <h3>Контактні телефони:</h3>
            <p>+38067452164</p>
            <p>+38044596513</p>
          </div>
          <div className="social-media">
            <h3>Соціальні мережі:</h3>
            <ul>
              <li><a href="#"><img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" /> </a></li>
              <li><a href="#"><img src="https://www.svgrepo.com/show/452115/telegram.svg" alt="Telegram" /> </a></li>
              <li><a href="#"><img src="https://www.svgrepo.com/show/452229/instagram-1.svg" alt="Instagram" /> </a></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
