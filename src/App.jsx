import { useState } from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { myImages } from './data/data.js';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './pages/Detail.jsx';


function App() {

  let navigate = useNavigate();

  return (
    <>
      <div className='App'>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Shoes Shop</Navbar.Brand>
              <Nav className="me-auto">
                  <Nav.Link onClick={()=> { navigate('/'); }}>Home</Nav.Link>
                  <Nav.Link onClick={()=> { navigate('/detail/0'); }}>Cart</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
     


          <Routes>
            <Route path="/" element={
              <div>
                <div className='main-bg'></div>
                <div className="container">
                  <div className="row">             
                      {
                          myImages.map((image) => {
                            return <Card image={image} key={image.id}  />;
                          })
                        }
                  </div>
                </div> 
              </div>
            } />
            <Route path="/detail/:id" element={
              <div className="container">
                  <Detail myImages={myImages} />                  
              </div> 
            } />
            <Route path="*" element={
              <div>404 없는 페이지 입니다.</div>
            } />
          </Routes>

          <div>
          </div>
      </div>
    </>
  )
}



function Card({image}){ //props 대신 중괄호를 사용해 바로 변수를 꺼내 쓸 수 있음

  // props.image.title 대신 바로 title로 접근 가능
  const { src, title, content, price } = image;

  return (
    <div className="col-md-4">
      <Link to={`/detail/${image.id}`}>
        <img src={src} width="100%" alt={title} />
      </Link>
      <strong>{title}</strong>
      <p>
        {content}
      </p>
      <p>
        {price}
      </p>
    </div>
  )
}

export default App
