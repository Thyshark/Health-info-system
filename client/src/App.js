import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProgramManagement from './components/programmanagement';
import ClientManagement from './components/clientManagement';
import ClientProfile from './components/clientProfile';
import ClientRegistration from './components/ClientRegistration';
//import Client from './components/clientForm';
import './App.css';

function App() {
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [newClientId, setNewClientId] = useState(null);

  useEffect(() => {
    fetchClients();
    fetchPrograms();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('/api/programs');
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const handleClientRegistered = (clientId) => {
    setNewClientId(clientId);
    fetchClients();
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* Default route redirects to client registration */}
            <Route path="/" element={<Navigate to="/ClientRegistration" />} />

            {/* Client Registration */}
            <Route path="/ClientRegistration" element={
              <ClientRegistration 
                onSuccess={handleClientRegistered} 
              />
            } />

            {/* After registration, redirect to client profile */}
            <Route path="/clientProfile" element={
              newClientId ? (
                <ClientProfile 
                  clientId={newClientId}
                  programs={programs}
                  refreshClients={fetchClients}
                />
              ) : (
                <Navigate to="/clientProfile" />
              )
            } />

            {/* Client Management */}
            <Route path="/clients" element={
              <ClientManagement 
                clients={clients} 
                programs={programs} 
                refreshClients={fetchClients} 
              />
            } />

            {/* Individual Client Profile */}
            <Route path="/clientProfile/:id" element={
              <ClientProfile 
                programs={programs} 
                refreshClients={fetchClients} 
              />
            } />

            {/* Program Management */}
            <Route path="/programs" element={
              <ProgramManagement 
                programs={programs} 
                refreshPrograms={fetchPrograms} 
              />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;