import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const Strech = () => {
  const [streches, setStreches] = useState([]);
  const [editingStrech, setEditingStrech] = useState(null);
  const [newStrech, setNewStrech] = useState({
    photo: "",
    name: "",
    price: "",
    id_color: "",
    id_coating: "",
  });
  const [colors, setColors] = useState([]);
  const [coatings, setCoatings] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [strechesPerPage] = useState(5);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    success: true,
  });

  useEffect(() => {
    axios
      .get("https://skyline-stretch-server.onrender.com/api/strech/strech")
      .then((response) => {
        setStreches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching strech data:", error);
      });

    axios
      .get("https://skyline-stretch-server.onrender.com/api/color/color")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });

    axios
      .get("https://skyline-stretch-server.onrender.com/api/coating/coating")
      .then((response) => {
        setCoatings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching coatings:", error);
      });
  }, []);

  // Pagination
  const indexOfLastStrech = currentPage * strechesPerPage;
  const indexOfFirstStrech = indexOfLastStrech - strechesPerPage;
  const currentStreches = streches.slice(indexOfFirstStrech, indexOfLastStrech);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (strech) => {
    setEditingStrech(strech);
    setShowEditForm(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://skyline-stretch-server.onrender.com/api/strech/strech/${id}`)
      .then(() => {
        setStreches((prevStreches) =>
          prevStreches.filter((strech) => strech.id !== id)
        );
        showNotification("Натяжна стеля успішно видалена!", true);
      })
      .catch((error) => {
        console.error("Error deleting strech:", error);
        showNotification("Помилка при видаленні натяжної стелі!", false);
      });
  };

  const updateStrech = () => {
    const strechData = {
      photo: editingStrech.photo,
      name: editingStrech.name,
      price: editingStrech.price,
      id_color: editingStrech.id_color,
      id_coating: editingStrech.id_coating,
    };

    axios
      .put(
        `https://skyline-stretch-server.onrender.com/api/strech/strech/${editingStrech.id}`,
        strechData
      )
      .then((response) => {
        setStreches((prevStreches) =>
          prevStreches.map((strech) =>
            strech.id === editingStrech.id ? response.data : strech
          )
        );
        setEditingStrech(null);
        setShowEditForm(false);
        showNotification("Натяжна стеля успішно оновлена!", true);
      })
      .catch((error) => {
        console.error("Error updating strech:", error);
        showNotification("Помилка при оновленні натяжної стелі!", false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingStrech({ ...editingStrech, [name]: value });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewStrech({ ...newStrech, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateStrech();
  };

  const handleAddNewStrech = (e) => {
    e.preventDefault();

    axios
      .post("https://skyline-stretch-server.onrender.com/api/strech/strech", newStrech)
      .then((response) => {
        setStreches([...streches, response.data]);
        setNewStrech({
          photo: "",
          name: "",
          price: "",
          id_color: "",
          id_coating: "",
        });
        setShowAddForm(false);
        showNotification("Нова натяжна стеля успішно додана!", true);
      })
      .catch((error) => {
        console.error("Error adding new strech:", error);
        showNotification("Помилка при додаванні нової натяжної стелі!", false);
      });
  };

  const handleAdd = () => {
    setShowAddForm(true);
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
    <div className="strech-container">
      <h2>Натяжні стелі</h2>
      {notification.show && (
        <div
          className={`notification ${
            notification.success ? "success" : "error"
          }`}
        >
          {notification.message}
        </div>
      )}
      <table className="strech-table">
        <thead>
          <tr>
            <th className="strech-header">Фото</th>
            <th className="strech-header">Назва</th>
            <th className="strech-header">Колір</th>
            <th className="strech-header">Покриття</th>
            <th className="strech-header">Ціна</th>
            <th className="strech-header">Дія</th>
          </tr>
        </thead>
        <tbody>
          {currentStreches.map((strech) => (
            <tr key={strech.id}>
              <td>{strech.photo}</td>
              <td>{strech.name}</td>
              <td>{strech.color_name}</td>
              <td>{strech.coating_name}</td>
              <td>{strech.price}</td>
              <td>
                <button
                  className="strech-edit-button"
                  onClick={() => handleEdit(strech)}
                >
                  Редагувати
                </button>
                <button
                  className="strech-delete-button"
                  onClick={() => handleDelete(strech.id)}
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="strech-add-button" onClick={handleAdd}>
        Додати
      </button>
      <ul className="pagination">
        {Array.from({
          length: Math.ceil(streches.length / strechesPerPage),
        }).map((_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      {editingStrech && showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditForm(false)}>
              &times;
            </span>
            <form className="strech-form" onSubmit={handleFormSubmit}>
              <input
                className="strech-input"
                type="text"
                name="photo"
                value={editingStrech.photo}
                onChange={handleInputChange}
              />
              <input
                className="strech-input"
                type="text"
                name="name"
                value={editingStrech.name}
                onChange={handleInputChange}
              />
              <select
                className="strech-select"
                name="id_color"
                value={editingStrech.id_color || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Оберіть колір
                </option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
              <select
                className="strech-select"
                name="id_coating"
                value={editingStrech.id_coating || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Оберіть покриття
                </option>
                {coatings.map((coating) => (
                  <option key={coating.id} value={coating.id}>
                    {coating.name}
                  </option>
                ))}
              </select>
              <input
                className="strech-input"
                type="number"
                name="price"
                value={editingStrech.price}
                onChange={handleInputChange}
              />
              <button className="strech-submit-button" type="submit">
                Оновити
              </button>
            </form>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddForm(false)}>
              &times;
            </span>
            <form className="strech-form" onSubmit={handleAddNewStrech}>
              <input
                className="strech-input"
                type="text"
                name="photo"
                placeholder="Фото URL"
                value={newStrech.photo}
                onChange={handleNewInputChange}
              />
              <input
                className="strech-input"
                type="text"
                name="name"
                placeholder="Назва"
                value={newStrech.name}
                onChange={handleNewInputChange}
              />
              <select
                className="strech-select"
                name="id_color"
                value={newStrech.id_color}
                onChange={handleNewInputChange}
              >
                <option value="" disabled>
                  Оберіть колір
                </option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
              <select
                className="strech-select"
                name="id_coating"
                value={newStrech.id_coating}
                onChange={handleNewInputChange}
              >
                <option value="" disabled>
                  Оберіть покриття
                </option>
                {coatings.map((coating) => (
                  <option key={coating.id} value={coating.id}>
                    {coating.name}
                  </option>
                ))}
              </select>
              <input
                className="strech-input"
                type="number"
                name="price"
                placeholder="Ціна"
                value={newStrech.price}
                onChange={handleNewInputChange}
              />
              <button className="strech-submit-button" type="submit">
                Додати
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Strech;
