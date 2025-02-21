import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Elaine Creating Product
export default function AddWorkout() {

  // const [user] = useState({ isAdmin: true });
  const [user] = useState();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  const createWorkout = (e) => {
    e.preventDefault();

    if (!name || !duration) {
      setError('All fields are required');
      return;
    }

    let token = localStorage.getItem('token');

    fetch(`https://fitnessapi-calingasan.onrender.com/workouts/addWorkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        duration: duration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess('');
        } else {
          setSuccess('Workout successfully added!');
          setError('');
          // Clear input fields
          setName('');
          setDuration('');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        setError('An error occurred. Please try again.');
        setSuccess('');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="my-5 text-center">Add Workout</h1>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg border-0 rounded-4">
            
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form onSubmit={createWorkout}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Duration:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Duration"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="p-2"
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit" className="px-4 py-2 fw-bold">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
