import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"

function App() {
  const [users, setUser] =useState([]);
  console.log(users);

  // Server side data access
  useEffect(()=>{
     fetch('http://localhost:4000/users')
     .then(res => res.json())
     .then(data => setUser(data));
  }, [])


  // Collect form data
  const handleFormSubmit = (event)=>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    
    const user = {name, email};

    // send form data to database

    fetch('http://localhost:4000/users',{
      method:"POST",
      headers:{
        'content-type':'application/json',
      },
      body:JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data =>{
      const newUser = [...users, data];
      setUser(newUser);
      form.reset();
    })
  
  }

  return (
    <>
      <Container>
        <Row>
          <Col className="col-md-5 mx-auto">
            <h2 className="mt-4 text-center">User Form</h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                <Form.Label className="text-start"> Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id=""
                  placeholder="Enter Name"
                />
              </Form.Group>
              <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                <Form.Label className="text-start">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  id=""
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Control
                className="btn btn-primary"
                type="submit"
                value="Add User"
              />
            </Form>
          </Col>
          <Col>
            <div>
              <h2 className="text-center mt-3">User Management Server</h2>
              <p className="text-center">User Length:{users.length}</p>
              <p>
                
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
