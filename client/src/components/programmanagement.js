import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form, ListGroup, Badge, Alert } from 'react-bootstrap';

const ProgramManagement = ({ programs, refreshPrograms }) => {
  const [programName, setProgramName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!programName.trim()) {
      setError('Program name is required');
      return;
    }

    try {
      await axios.post('/api/programs', { 
        name: programName.trim(), 
        description: description.trim() 
      });
      setProgramName('');
      setDescription('');
      setSuccess('Program created successfully!');
      refreshPrograms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create program');
    }
  };

  const handleDelete = async (programId) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await axios.delete(`/api/programs/${programId}`);
        setSuccess('Program deleted successfully!');
        refreshPrograms();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete program');
      }
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-primary">
        <i className="fas fa-clipboard-list me-2"></i>
        Health Program Management
      </h2>
      
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Create New Health Program</h5>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Program Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Tuberculosis, HIV, Diabetes"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                required
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
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                <i className="fas fa-plus-circle me-2"></i>
                Create Program
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
          {programs.length === 0 ? (
            <div className="text-center py-4 text-muted">
              <i className="fas fa-info-circle fa-2x mb-3"></i>
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
                    </h6>
                    {program.description && (
                      <small className="text-muted">{program.description}</small>
                    )}
                  </div>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDelete(program._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
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