import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    success: true,
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/application/application');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/application/status');
        setStatuses(response.data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []);

  // Pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle editing application status
  const handleEdit = (application) => {
    setEditingApplication(application);
  };

  // Handle status change
  const handleStatusChange = (e) => {
    const { value } = e.target;
    setEditingApplication(prev => ({ ...prev, id_status: value }));
  };

  // Handle save status
  const handleSaveStatus = async () => {
    try {
      await axios.put(`http://localhost:8081/api/application/application/${editingApplication.id}`, { id_status: editingApplication.id_status });
      const updatedStatus = statuses.find(status => status.id === parseInt(editingApplication.id_status, 10));
      setApplications(applications.map(app => (app.id === editingApplication.id ? { ...app, id_status: editingApplication.id_status, status_name: updatedStatus ? updatedStatus.name : app.status_name } : app)));
      setEditingApplication(null);
      showNotification("Статус заявки успішно оновлено!", true);
    } catch (error) {
      console.error('Error updating application status:', error);
      showNotification("Помилка при оновленні статусу заявки!", false);
    }
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
    <div className="application-container">
      <h2>Заявки</h2>
      {notification.show && (
        <div
          className={`notification ${notification.success ? "success" : "error"}`}
        >
          {notification.message}
        </div>
      )}
      <table className="application-table">
        <thead>
          <tr>
            <th>Номер телефону</th>
            <th>Електронна пошта</th>
            <th>Текст</th>
            <th>Статус</th>
            <th>Дія</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((application) => (
            <tr key={application.id}>
              <td>{application.phone_number}</td>
              <td>{application.email}</td>
              <td>{application.text}</td>
              <td>{application.status_name}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(application)}>Редагувати</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(applications.length / applicationsPerPage) }).map((_, index) => (
          <li key={index}>
            <button onClick={() => paginate(index + 1)}>{index + 1}</button>
          </li>
        ))}
      </ul>
      {/* Edit Modal */}
      {editingApplication && (
        <div className="modal">
          <div className="modal-content">
            <h3>Редагування статусу заявки</h3>
            <p>Номер: {editingApplication.id}</p>
            <p>Статус: {editingApplication.status_name}</p>
            <select value={editingApplication.id_status} onChange={handleStatusChange} className="status-select">
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
            <button onClick={handleSaveStatus} className="save-button">Зберегти</button>
            <button onClick={() => setEditingApplication(null)} className="cancel-button">Вихід</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;