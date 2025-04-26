import React, { useState } from 'react';
import axios from 'axios';

const ClientForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/clients', formData);
      onSuccess();
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="contactInfo.email"
            value={formData.contactInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            name="contactInfo.phone"
            value={formData.contactInfo.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="contactInfo.address"
            value={formData.contactInfo.address}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Register Client</button>
        </div>
      </div>
    </form>
  );
};

export default ClientForm;