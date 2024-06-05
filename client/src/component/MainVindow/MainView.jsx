import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './style.css';

export default function MainView() {
  return (
    <>
      <NavBar />
      <div className="main-view">
        <div className="content-container">
          <div className="text-container">
            <h1>Натяжні стелі від професіоналів! Розкажемо, як перетворити ваш простір у шедевр!</h1>
            <h2><b>Досвід та творчість об'єднуються для створення вашого ідеального простору</b></h2>
            <button className="styled-button">Переглянути каталог</button>
          </div>
          <div className="image-container"><img src="https://th.bing.com/th/id/OIP.6KNEBXZIAv3Ci8tMUQUCJQHaFj?w=236&h=180&c=7&r=0&o=5&pid=1.7" alt="Image" />
          </div>
        </div>
        <div className="green-blocks-container">
          <div className="green-block">
            <div className="rowclo">
            <div className="icon"><img src="https://www.svgrepo.com/show/298680/time-stopwatch.svg" alt="Icon" /></div>
            <div className="text-content">
              <h3>Швидко та ефективно!</h3>
              </div>
            </div>
              <p>Відчуйте швидкість та ефективність оновлення вашого простору завдяки нашим натяжним стелям</p>
          </div>
          <div className="green-block">
          <div className="rowclo">
            <div className="icon"><img src="https://www.svgrepo.com/show/493057/japanese-style-room-2.svg" alt="Icon" /></div>
            <div className="text-content">
              <h3>Стиль та витонченість.</h3>
              </div>
            </div>
              <p>Наші натяжні стелі поєднують у собі елегантний стиль та високу функціональність.</p>
          </div>
          <div className="green-block">
            <div className="rowclo"><div className="icon"><img src="https://www.svgrepo.com/show/484622/security-shield.svg" alt="Icon" /></div>
            <div className="text-content">
              <h3>Комфорт та безпека.</h3>
              </div>
              </div>
              <p>Наші натяжні стелі не лише створюють затишок та красу в вашому просторі, але і забезпечують комфорт та безпеку.</p>
            </div>
        </div>
        <h2 className="centered-heading">Види натяжних стель</h2>
        <div className="projects-container">
          <div className="project-block">
            <img src="https://th.bing.com/th/id/OIP.zW9H3oe1baEickbV9XPMOgHaFj?rs=1&pid=ImgDetMain" alt="Project 1" />
            <h3>Різноманітність наших пропозицій</h3>
            <p>Ми пропонуємо широкий вибір натяжних стель, які відповідатимуть різним стилям і потребам. Від класичних варіантів до сучасних інновацій - у нас є все, щоб задовольнити ваші очікування та найвибагливіші смаки.</p>
          </div>
          <div className="project-block">
            <img src="https://th.bing.com/th/id/R.b4413a86a42f88e1e4625867dcf7590e?rik=TASQPR02e1UaIA&pid=ImgRaw&r=0" alt="Project 2" />
            <h3>Класична елегантність</h3>
            <p>Для тих, хто цінує традиційний стиль і елегантність, ми пропонуємо широкий вибір білих, кремових та нейтральних кольорів, а також різноманітні текстури. Ці стелі створюють атмосферу затишку і гармонії, ідеально підходять для будь-якого приміщення.</p>
          </div>
          <div className="project-block">
            <img src="https://th.bing.com/th/id/R.bb35ea2f95a0f3cdd0202ebcaee2bd01?rik=19XKbpCfZyn2%2fQ&pid=ImgRaw&r=0" alt="Project 3" />
            <h3>Сучасна естетика</h3>
            <p>Для сучасних та креативних інтер'єрів ми пропонуємо інноваційні рішення, які надають простору унікальний вигляд. Фотопечать, 3D-ефекти, світлові вбудовані елементи - все це допоможе створити неповторний дизайн вашого приміщення, який вразить вашіх гостей та надовго залишиться в пам'яті.</p>
          </div>
          <div className="project-block">
            <img src="https://th.bing.com/th/id/OIP.MlAyhDPWcs1xZYq7iZhFVAHaFj?rs=1&pid=ImgDetMain" alt="Project 4" />
            <h3>Економічні рішення</h3>
            <p>Якість за доступною ціною - це наш гасло. Ми розуміємо, що естетика не повинна бути дорогим задоволенням, тому пропонуємо бюджетні варіанти, які дозволять вам отримати якісний результат за помірну ціну.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
