import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import RoomCalculator from '../RoomCalculator/RoomCalculator'; // Імпорт компонента
import ContactForm from '../ContactForm/ContactForm';

export default function StrechDetails() {
  const { id } = useParams();
  const [strech, setStrech] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/strech/strech/${id}`)
      .then(response => {
        setStrech(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the strech details!", error);
      });
  }, [id]);

  if (!strech) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="strech-details">
        <h1>{strech.name}</h1>
        <img src={strech.photo} alt={strech.name} className="strech-img" />
        <p>Ціна: {strech.price} грн/м²</p>
        <p>Колір: {strech.color_name}</p>
        <p>Покриття: {strech.coating_name}</p>
        <p>{strech.coating_description}</p>
      <div className='roomcalc'>
              <RoomCalculator pricePerSquareMeter={strech.price} /> {/* Додавання RoomCalculator */}
      </div>
      <div>
        <ContactForm idStrech={strech.id} />
      </div>
      </div>
      
      <Footer />
    </>
  );
}
