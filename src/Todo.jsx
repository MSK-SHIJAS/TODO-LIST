import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';

const Todo = () => {
  const { id: projectId } = useParams();
  const [projectTitle, setProjectTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ description: '', date: '', status: 'pending' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axios.get(`http://localhost:4000/projects/project/${projectId}`);
        setProjectTitle(projectResponse.data.title);
        const todosResponse = await axios.get(`http://localhost:4000/todos/get`);
        setTodos(todosResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [projectId]);

  const addTodo = async () => {
    if (isEditing) {
      try {
        await axios.put(`http://localhost:4000/todos/todo/${currentTodoId}`, newTodo);
        setTodos(todos.map(todo => (todo._id === currentTodoId ? { ...todo, ...newTodo } : todo)));
      } catch (error) {
        console.error('Error updating todo:', error);
      }
      setIsEditing(false);
      setCurrentTodoId(null);
    } else {
      try {
        const response = await axios.post(`http://localhost:4000/todos/${projectId}/todo`, newTodo);
        setTodos([...todos, response.data]);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
    setNewTodo({ description: '', date: '', status: 'pending' });
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo._id === id);
    setNewTodo({ description: todoToEdit.description, date: todoToEdit.date, status: todoToEdit.status });
    setIsEditing(true);
    setCurrentTodoId(id);
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todos/todo/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleStatus = async (id) => {
    const updatedStatus = todos.find(todo => todo._id === id).status === 'pending' ? 'complete' : 'pending';
    try {
      await axios.patch(`http://localhost:4000/todos/todo/${id}`, { status: updatedStatus });
      setTodos(todos.map(todo => (todo._id === id ? { ...todo, status: updatedStatus } : todo)));
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const totalCompleted = todos.filter(todo => todo.status === 'complete').length;
  const totalPending = todos.filter(todo => todo.status === 'pending').length;

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">{projectTitle || 'Loading...'}</h2>

      <Form className="mb-4">
        <Row className="g-2">
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="date"
              value={newTodo.date}
              onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
            />
          </Col>
          <Col md={3}>
            <Button variant="primary" onClick={addTodo}>
              {isEditing ? "Update Todo" : "Add Todo"}
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="g-3">
        <Col md={8}>
          <ListGroup>
            {todos.map(todo => (
              <ListGroup.Item key={todo._id} className="d-flex justify-content-between align-items-start">
                <div>
                  <h5>{todo.description}</h5>
                  <p>Date: {todo.date}</p>
                  <p>Status: <strong>{todo.status}</strong></p>
                </div>
                <div>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => toggleStatus(todo._id)}
                    className="me-2"
                  >
                    Mark as {todo.status === 'pending' ? 'Complete' : 'Pending'}
                  </Button>
                  <Button variant="outline-warning" size="sm" onClick={() => editTodo(todo._id)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => removeTodo(todo._id)}>
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Todo Summary</Card.Title>
              <p>Total Completed: {totalCompleted}</p>
              <p>Total Pending: {totalPending}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Todo;
