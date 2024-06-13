import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import './style.css'; // assuming the CSS file is in the same directory

export default function Catalog() {
  const [streches, setStreches] = useState([]);
  const [colors, setColors] = useState([]);
  const [coatings, setCoatings] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCoating, setSelectedCoating] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filteredStreches, setFilteredStreches] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to control the filter menu
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Changed to 8 items per page

  useEffect(() => {
    axios.get('http://localhost:8081/api/strech/strechCards')
      .then(response => {
        setStreches(response.data);
        setFilteredStreches(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the streches!", error);
      });

    axios.get('http://localhost:8081/api/color/color')
      .then(response => {
        setColors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the colors!", error);
      });

    axios.get('http://localhost:8081/api/coating/coating')
      .then(response => {
        setCoatings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the coatings!", error);
      });
  }, []);

  const handleFilter = () => {
    const filtered = streches.filter(strech => {
      const matchesColor = selectedColor ? strech.id_color === parseInt(selectedColor, 10) : true;
      const matchesCoating = selectedCoating ? strech.id_coating === parseInt(selectedCoating, 10) : true;
      const matchesPrice = strech.price >= minPrice && strech.price <= maxPrice;
      return matchesColor && matchesCoating && matchesPrice;
    });
    setFilteredStreches(filtered);
    setIsFilterOpen(false); // Close the filter panel after filtering
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStreches.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStreches.length / itemsPerPage);

  return (
    <>
      <NavBar />
      <div className="catalog-container">
        <button className="burger-menu" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? 'Закрити фільтри' : 'Відкрити фільтри'}
        </button>
        <div className={`filter-panel ${isFilterOpen ? 'open' : ''}`}>
          <h3>Фільтри</h3>
          <div className="filter-group">
            <label>Колір:</label>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="">Всі</option>
              {colors.map(color => (
                <option key={color.id} value={color.id}>{color.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Поверхня:</label>
            <select value={selectedCoating} onChange={(e) => setSelectedCoating(e.target.value)}>
              <option value="">Всі</option>
              {coatings.map(coating => (
                <option key={coating.id} value={coating.id}>{coating.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Ціна:</label>
            <div className="price-inputs">
              <input 
                type="number" 
                value={minPrice} 
                onChange={(e) => setMinPrice(Number(e.target.value))} 
                placeholder="Від"
                min="0"
              />
              <input 
                type="number" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))} 
                placeholder="До"
                min="0"
              />
            </div>
          </div>
          <button onClick={handleFilter}>Фільтрувати</button>
        </div>
        <div className="catalog">
          {currentItems.map(strech => (
            <div key={strech.id} className="card">
              <img src={strech.photo} alt={strech.name} className="card-img"/>
              <div className="card-content">
                <h3>{strech.name}</h3>
                <p>Ціна: {strech.price}</p>
                <Link to={`/strech/${strech.id}`}>
                  <button>Детальніше</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
