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

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  // Calculate age function - now properly defined inside the component
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`/api/clients/${id}`);
        setClient(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load client');
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={() => navigate('/clients')}>
          Back to Clients
        </Button>
      </Container>
    );
  }

  if (!client) {
    return (
      <Container className="py-4">
        <Alert variant="warning">Client not found</Alert>
        <Button variant="secondary" onClick={() => navigate('/clients')}>
          Back to Clients
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          {client.firstName} {client.lastName}
          <Badge bg="secondary" className="ms-2">
            ID: {client._id}
          </Badge>
        </h2>
        <Button variant="outline-primary" onClick={() => navigate(`/clients/${id}/edit`)}>
          Edit Profile
        </Button>
      </div>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        <Tab eventKey="profile" title="Profile">
          <Card className="mb-4">
            <Card.Header>Personal Information</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Date of Birth:</strong> {new Date(client.dateOfBirth).toLocaleDateString()}</p>
                  <p><strong>Gender:</strong> {client.gender}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Age:</strong> {calculateAge(client.dateOfBirth)}</p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Contact Information</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Email:</strong> {client.contactInfo.email || 'Not provided'}</p>
                  <p><strong>Phone:</strong> {client.contactInfo.phone || 'Not provided'}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Address:</strong></p>
                  <p>{client.contactInfo.address || 'Not provided'}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="programs" title="Programs">
          <Card>
            <Card.Header>Enrolled Health Programs</Card.Header>
            <Card.Body>
              {client.programs.length > 0 ? (
                <ListGroup variant="flush">
                  {client.programs.map(program => (
                    <ListGroup.Item key={program._id}>
                      <h5>{program.name}</h5>
                      {program.description && <p className="text-muted">{program.description}</p>}
                    </ListGroup.Item>
                  ))}
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