import { useState } from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { myImages } from './data/data.js';



function App() {

  return (
    <>
      <div className='App'>
          <div>
            <Navbar bg="dark" variant="dark">
              <Container>
              <Navbar.Brand href="#home">Shoes Shop</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
              </Container>
            </Navbar>

            <div className='main-bg'></div>

            <div className="container">
              <div className="row">             
                   {
                    myImages.map((image) => (
                        <div className="col-md-4" key={image.id}>
                          <img src={image.src} width="100%" alt={image.title} />
                          <h4>{image.title}</h4>
                          <p>
                            {image.content}
                          </p>
                           <p>
                            {image.price}
                          </p>
                        </div>
                      ))
                    }
              </div>
            </div> 




          </div>
      </div>
    </>
  )
}

export default App
