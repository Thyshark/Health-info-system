import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const EnrollClient = ({ programs, onEnrollSuccess }) => {
  const { clientId } = useParams();
  const [show, setShow] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!selectedProgram) {
      setError('Please select a program');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`/api/clients/${clientId}/enroll`, {
        programId: selectedProgram
      });

      onEnrollSuccess(response.data.client);
      setShow(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Enrollment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="success" onClick={() => setShow(true)}>
        <i className="fas fa-user-plus me-2"></i>
        Enroll in Program
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enroll Client in Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>Select Program</Form.Label>
            <Form.Select 
              value={selectedProgram} 
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              <option value="">Choose a program...</option>
              {programs.map(program => (
                <option key={program._id} value={program._id}>
                  {program.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEnroll} disabled={loading}>
            {loading ? 'Enrolling...' : 'Enroll'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EnrollClient;