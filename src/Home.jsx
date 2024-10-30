import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/projects/get')
      .then(response => setProjects(response.data))
      .catch(error => console.log(error));
  }, []);

  const createProject = () => {
    const newProject = { title, description, deadline };
    axios.post('http://localhost:4000/projects/project', newProject)
      .then(response => {
        setProjects([...projects, response.data]);
        setTitle('');
        setDescription('');
        setDeadline('');
      })
      .catch(error => console.log(error));
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Todo Projects</h1>

      <Form className="mb-4">
        <Row className="g-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Project Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </Col>
        </Row>
        <Button variant="primary" className="mt-3" onClick={createProject}>
          Create Project
        </Button>
      </Form>

      <Row xs={1} md={3} className="g-4">
        {projects.map(project => (
          <Col key={project._id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>PROJECT NAME: {project.title}</Card.Title>
                <Card.Text>DESCRIPTION: {project.description}</Card.Text>
                <Card.Text><strong>Deadline:</strong> {project.deadline}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="primary" onClick={() => navigate(`/project/${project._id}`)}>
                  Click Here
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
