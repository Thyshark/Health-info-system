import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Card, 
  Button, 
  Form, 
  ListGroup, 
  Badge, 
  Alert,
  Spinner
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faPlusCircle, faTrashAlt, faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ProgramManagement = ({ programs = [], refreshPrograms }) => {
  const [programName, setProgramName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!programName.trim()) {
      setError('Program name is required');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('/api/programs', { 
        name: programName.trim(), 
        description: description.trim() 
      });
      setProgramName('');
      setDescription('');
      setSuccess('Program created successfully!');
      await refreshPrograms();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create program');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleDelete = async (programId) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setIsLoading(true);
      try {
        await axios.delete(`/api/programs/${programId}`);
        setSuccess('Program deleted successfully!');
        await refreshPrograms();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete program');
      } finally {
        setIsLoading(false);
        setTimeout(() => setSuccess(''), 3000);
      }
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-primary">
        <FontAwesomeIcon icon={faClipboardList} className="me-2" />
        Health Program Management
      </h2>
      
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Create New Health Program</h5>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
          {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Program Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Tuberculosis, HIV, Diabetes"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                required
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Brief description of the program..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spinner as="span" size="sm" animation="border" role="status" aria-hidden="true" />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                    Create Program
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header className="bg-light">
          <h5 className="mb-0">Existing Health Programs</h5>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-4 text-muted">
              <FontAwesomeIcon icon={faInfoCircle} size="2x" className="mb-3" />
              <p>No health programs found. Create one to get started.</p>
            </div>
          ) : (
            <ListGroup variant="flush">
              {programs.map((program) => (
                <ListGroup.Item 
                  key={program._id} 
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 className="mb-1">
                      <Badge bg="info" className="me-2">
                        {program.name.charAt(0).toUpperCase()}
                      </Badge>
                      {program.name}
                      <Badge bg="secondary" className="ms-2">
                        {program.enrolledClients?.length || 0} enrolled
                      </Badge>
                    </h6>
                    {program.description && (
                      <small className="text-muted">{program.description}</small>
                    )}
                  </div>
                  <div>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(program._id)}
                      className="me-2"
                      disabled={isLoading}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => navigate(`/programs/${program._id}/enroll`)}
                      disabled={isLoading}
                    >
                      <FontAwesomeIcon icon={faUserPlus} />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProgramManagement;