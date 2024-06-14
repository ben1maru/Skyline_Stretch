import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Color = () => {
  const [colors, setColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [colorsPerPage] = useState(5);
  const [newColor, setNewColor] = useState({
    name: ''
  });
  const [editingColor, setEditingColor] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    success: true,
  });

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get(`https://skyline-stretch-server.onrender.com/api/color/color`);
        setColors(response.data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, []);

  // Pagination
  const indexOfLastColor = currentPage * colorsPerPage;
  const indexOfFirstColor = indexOfLastColor - colorsPerPage;
  const currentColors = colors.slice(indexOfFirstColor, indexOfLastColor);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle input change for adding new color
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewColor({ ...newColor, [name]: value });
  };

  // Handle input change for editing color
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingColor({ ...editingColor, [name]: value });
  };

  // Handle form submission for adding new color
  const handleAddNewColor = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/api/color/color", newColor);
      console.log("New color added successfully:", response.data);
      setColors([...colors, response.data]);
      setNewColor({ name: '' });
      setShowAddForm(false);
      showNotification("Новий колір успішно доданий!", true);
    } catch (error) {
      console.error("Error adding new color:", error);
      showNotification("Помилка при додаванні нового кольору!", false);
    }
  };

  // Handle form submission for editing color
  const handleUpdateColor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://skyline-stretch-server.onrender.com/api/color/color/${editingColor.id}`, editingColor);
      console.log("Color updated successfully:", response.data);
      setColors(colors.map(color => (color.id === editingColor.id ? response.data : color)));
      setEditingColor(null);
      showNotification("Колір успішно оновлений!", true);
    } catch (error) {
      console.error("Error updating color:", error);
      showNotification("Помилка при оновленні кольору!", false);
    }
  };

  // Handle deletion of color
  const handleDeleteColor = async (id) => {
    try {
      await axios.delete(`https://skyline-stretch-server.onrender.com/api/color/color/${id}`);
      console.log("Color deleted successfully:", id);
      setColors(colors.filter(color => color.id !== id));
      showNotification("Колір успішно видалений!", true);
    } catch (error) {
      console.error("Error deleting color:", error);
      showNotification("Помилка при видаленні кольору!", false);
    }
  };

  // Open modal for adding new color
  const handleAdd = () => {
    setShowAddForm(true);
  };

  // Open modal for editing color
  const handleEdit = (color) => {
    setEditingColor(color);
  };

  const showNotification = (message, success) => {
    setNotification({
      show: true,
      message: message,
      success: success,
    });
    setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        success: true,
      });
    }, 3000);
  };

  return (
    <div className="color-container">
      <h2>Колір</h2>
      {notification.show && (
        <div
          className={`notification ${
            notification.success ? "success" : "error"
          }`}
        >
          {notification.message}
        </div>
      )}
      <table className="color-table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Дія</th>
          </tr>
        </thead>
        <tbody>
          {currentColors.map((color) => (
            <tr key={color.id}>
              <td className="color-cell">{color.name}</td>
              <td className="color-cell">
                <button className="color-button" onClick={() => handleEdit(color)}>Редагувати</button>
                <button className="color-button" onClick={() => handleDeleteColor(color.id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <button onClick={handleAdd} className="color-button">Додати колір</button>
      <ul className="pagination">
        {Array.from({ length: Math.ceil(colors.length / colorsPerPage) }).map((_, index) => (
          <li key={index} className="page-item">
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>

      {/* Modal for adding new color */}
      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddForm(false)}>&times;</span>
            <form onSubmit={handleAddNewColor}>
              <input
                type="text"
                name="name"
                placeholder="Введіть назву кольора"
                value={newColor.name}
                onChange={handleNewInputChange}
                className="color-input"
              />
              <button type="submit" className="color-submit-button">Додати</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for editing color */}
      {editingColor && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditingColor(null)}>&times;</span>
            <form onSubmit={handleUpdateColor}>
              <input
                type="text"
                name="name"
                value={editingColor.name}
                onChange={handleEditInputChange}
                className="color-input"
              />
              <button type="submit" className="color-submit-button">Оновити</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Color;
