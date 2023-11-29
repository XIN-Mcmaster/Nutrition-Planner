import React, { useState } from 'react';
import { Form, FormControl, Button, Container, FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../images/bg_1.jpg';
import '../Styles/login.css'


const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the registration endpoint
      const response = await fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password
        }),
      });

      const json = await response.json()
      if (json.user) {
        navigate('/login')
      }

    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <div className="d-lg-flex half">
        <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${bg})` }}></div>
        <div className="contents order-2 order-md-1">
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col md={7}>
                <h2>Registration</h2>
                <Form>
                  <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/login">
                      <Button className="btn btn-block btn-color">Login</Button>
                    </Link>
                    <Button onClick={handleSubmit} className="btn btn-block btn-color">Submit</Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Registration;
