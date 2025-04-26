import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ClientForm from './clientForm';
import ClientSearch from './ClientSearch';

const ClientManagement = ({ clients, programs, refreshClients }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(clients);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = clients.filter(client =>
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const handleEnroll = async (clientId, programIds) => {
    try {
      await axios.put(`/api/clients/${clientId}/enroll`, { programIds });
      refreshClients();
    } catch (error) {
      console.error('Error enrolling client:', error);
    }
  };

  return (
    <div>
      <h2>Client Management</h2>
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Register New Client'}
      </button>

      {showForm && <ClientForm onSuccess={() => { setShowForm(false); refreshClients(); }} />}

      <ClientSearch onSearch={handleSearch} />

      <div className="list-group mt-3">
        {filteredClients.map(client => (
          <div key={client._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/clients/${client._id}`}>
                {client.firstName} {client.lastName}
              </Link>
              <div>
                <select 
                  className="form-select form-select-sm"
                  onChange={(e) => handleEnroll(client._id, [e.target.value])}
                  defaultValue=""
                >
                  <option value="" disabled>Enroll in program</option>
                  {programs.map(program => (
                    <option key={program._id} value={program._id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientManagement;