import React, { useState } from 'react';
import './style.css';

export default function RoomCalculator({ pricePerSquareMeter }) {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);

  const calculatePrice = () => {
    const area = parseFloat(length) * parseFloat(width);
    const price = area * pricePerSquareMeter;
    const finalPrice = price + (price * 0.20);
    setTotalPrice(finalPrice);
  };

  return (
    <div className="room-calculator">
      <h2>Калькулятор вартості</h2>
      <div className="input-group">
        <label>Довжина (м):</label>
        <input 
          type="number" 
          value={length} 
          onChange={(e) => setLength(e.target.value)} 
          placeholder="Введіть довжину" 
        />
      </div>
      <div className="input-group">
        <label>Ширина (м):</label>
        <input 
          type="number" 
          value={width} 
          onChange={(e) => setWidth(e.target.value)} 
          placeholder="Введіть ширину" 
        />
      </div>
      <button onClick={calculatePrice}>Розрахувати вартість</button>
      {totalPrice !== null && (
        <div className="total-price">
          <h3>Загальна вартість:</h3>
          <p>{totalPrice.toFixed(2)} грн</p>
        </div>
      )}
    </div>
  );
}
