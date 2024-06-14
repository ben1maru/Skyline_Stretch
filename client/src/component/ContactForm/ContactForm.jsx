import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const ContactForm = ({ idStrech }) => {
  const [formData, setFormData] = useState({
    phone_number: '',
    email: '',
    text: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://skyline-stretch-server.onrender.com/api/application/application', {
        phone_number: formData.phone_number,
        email: formData.email,
        text: formData.text,
        id_strech: idStrech
      });
      setFormData({ phone_number: '', email: '', text: '' });
      setMessage('Дані успішно надіслані. Ми з вами зв\'яжемося найближчим часом.');
      console.log(message);
    } catch (error) {
      console.error('Помилка при відправці форми!', error);
      setMessage('Сталася помилка при відправці форми. Будь ласка, спробуйте ще раз.');
    }
  };

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div className="contact-form">
      <h2>Напишіть нам</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Номер телефону:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Введіть номер телефону"
            required
          />
        </div>
        <div className="input-group">
          <label>Електронна скринька:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введіть вашу пошту"
            required
          />
        </div>
        <div className="input-group">
          <label>Повідомлення:</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Введіть ваше повідомлення"
            required
          />
        </div>
        <button type="submit" className="button-add">
          Відправити
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ContactForm;
