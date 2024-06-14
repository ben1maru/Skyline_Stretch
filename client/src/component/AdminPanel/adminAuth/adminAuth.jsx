import React, { Component } from 'react';
import axios from 'axios';
import './style.css'; // Підключення файлу стилів

class AdminAuth extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await axios.post('https://skyline-stretch-server.onrender.com/api/auth/login', { email, password });
        
        // Перенаправлення адміністратора на головну сторінку адміністрування
        window.location.href = '/admin/dashboard';
      
    } catch (error) {
      console.error('Error during login:', error);
      this.setState({ error: 'Internal server error' });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div className="admin-auth-container">
        <h2 className="admin-auth-heading">Авторизація</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="form-label">Електронна скринька:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Пароль:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              className="form-input"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="button">Увійти</button>
        </form>
      </div>
    );
  }
}

export default AdminAuth;
