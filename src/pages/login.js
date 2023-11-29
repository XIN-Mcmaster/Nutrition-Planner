import React, { useState } from 'react';
import { Form, FormControl, Button, Container, FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import { Link,useNavigate  } from 'react-router-dom';
import bg from '../images/bg_1.jpg';
import '../Styles/login.css'
import { useUser } from '../UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { updateUser} = useUser();


  const handleSubmit = async (e) => {
    try {
      // Make API call to login endpoint
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          email:email, 
          password:password  }),
      });

      const json = await response.json()
      if(json.userId){
        updateUser(json);
        navigate('/')
      }

    } catch (error) {
      console.error('Login failed:', error);
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
                <h2>Login</h2>
                <Form>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                  <Button onClick={handleSubmit} className="btn btn-block btn-color">Login</Button>
                  <Link to="/register">
                    <Button className="btn btn-block btn-color">Register</Button>
                  </Link>
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

export default Login;
