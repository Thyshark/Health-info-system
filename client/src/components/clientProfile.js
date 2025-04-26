import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  Button, 
  ListGroup, 
  Badge, 
  Alert, 
  Tab, 
  Tabs,
  Spinner
} from 'react-bootstrap';
import axios from 'axios';

const ClientProfile = ({ programs, refreshClients }) => { // Added programs to props
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  // ... rest of your component code ...

  return (
    <Container className="py-4">
      {/* ... other JSX ... */}
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        <Tab eventKey="profile" title="Profile">
          {/* ... profile tab content ... */}
        </Tab>
        <Tab eventKey="programs" title="Programs">
          <Card>
            <Card.Header>Enrolled Health Programs</Card.Header>
            <Card.Body>
              {client.programs.length > 0 ? (
                <ListGroup variant="flush">
                  {client.programs.map(programId => {
                    const program = programs.find(p => p._id === programId); // Now programs is defined
                    return program ? (
                      <ListGroup.Item key={program._id}>
                        <h5>{program.name}</h5>
                        {program.description && <p className="text-muted">{program.description}</p>}
                      </ListGroup.Item>
                    ) : null;
                  })}
                </ListGroup>
              ) : (
                <Alert variant="info">This client is not enrolled in any programs yet.</Alert>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ClientProfile;