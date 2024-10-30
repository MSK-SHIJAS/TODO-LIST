import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button, Container, ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const rectangleStyle = {
    width: '280px',
    height: 'auto',
    border: '2px solid #000',
    padding: '20px',
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login/login', formData);
      toast.success("Login successful");
      if (response.data.userType === 'admin') {
        navigate('/project');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Form className="p-4 border rounded d-flex flex-column align-items-center w-75">
          <Row className="d-flex w-100 justify-content-between">
            <Col xs={12} md={5} className="d-flex flex-column align-items-center" style={rectangleStyle}>
              <h4>TODO LIST</h4>
              <p className="fw-bold mt-5">username: abc, password: xyz (USE THIS FOR LOGIN)</p>
            </Col>
            <Col xs={12} md={5} className="d-flex flex-column align-items-center" style={rectangleStyle}>
              <h5>LOGIN</h5>
              <Form.Group className="mt-3 w-100">
                <input
                  type="text"
                  name="username"
                  placeholder="YOUR NAME"
                  className="form-control mb-3"
                  value={formData.username}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="YOUR PASSWORD"
                  className="form-control mb-3"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button type="submit" className="mt-3 w-100" onClick={handleSubmit}>
                  LOGIN
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Login;
