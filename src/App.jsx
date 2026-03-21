import { useState } from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { myProducts } from './data/data.js';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './pages/Detail.jsx';
import axios from 'axios';


function App() {
  
  let navigate = useNavigate();
  let [shoes, setShoes] = useState(myProducts[0].data); // 데이터를 state에 저장 - 초기값은 원본 데이터(myProducts)
  let [count, setCount] = useState(1); // 클릭 횟수 저장용 (초기값 1)
  let [loading, setLoading] = useState(false);
  let [isEnd, setIsEnd] = useState(false);

  return (
    <>
      <div className='App'>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Shoes Shop</Navbar.Brand>
              <Nav className="me-auto">
                  <Nav.Link onClick={()=> { navigate('/'); }}>Home</Nav.Link>
                  <Nav.Link onClick={()=> { navigate('/detail/0'); }}>Cart</Nav.Link>
              </Nav>0
            </Container>
          </Navbar>
     


          <Routes>
            <Route path="/" element={
              <div>
                <div className='main-bg'></div>
                <div className="container">
                  <div className="row">      
                      { 
                        loading === true ? <div>로딩 중입니다...</div> : null 
                      }       
                      {
                          shoes.map((image) => {
                            return <Card image={image} key={image.id}  />;
                          })
                        }
                  </div>
     
                 { isEnd === false && <button onClick={()=>{ 
                        setLoading(true); // 요청 시작할 때 true
                        axios.get(`${import.meta.env.BASE_URL}data${count + 1}.json`) // 서버 루트에서 파일을 찾기 (https:// ~ url도 가능) | 이번엔 public 폴더에서 가져왔음
                        .then((result)=>{
                            setLoading(false); // 성공했으니 일단 로딩은 꺼줌
                            // 1. 서버가 준 데이터에서 실제 상품 배열만 꺼내기
                            const serverData = result.data[0]; // JSON이 [ { ... } ] 형태이므로 0번째 선택
                            const newItems = serverData.data;

                            // 2. 가져온 데이터가 없으면 버튼 숨기기
                            if (!newItems || newItems.length === 0) {
                              setIsEnd(true); // 끝났다고 표시
                            }else{

                              // 기존 shoes 배열에 새로운 newItems 배열만 합치기 (중요!)
                              setShoes([...shoes, ...newItems]);
                              setCount(count + 1);

                              // 서버가 알려준 전체 페이지 수에 도달했다면 버튼 숨기기
                              if (count + 1 === serverData.totalPage) {
                                setIsEnd(true);
                              }
                            }
                        })
                        .catch((error)=>{
                          console.log(error, " 로 인해서 ajax 실패");
                          setLoading(false); // 실패해도 다시 false로 바꿔줘야 버튼이 다시 작동함
                          setIsEnd(true);// 파일이 없어서(404) 에러가 나도 버튼을 숨김
                        });
                      }}>더보기</button>  

                  }
                  
                </div> 
              </div>
            } />
            <Route path="/detail/:id" element={
              <div className="container">
                  <Detail myProducts={shoes} /> 
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
        <img src={import.meta.env.BASE_URL + src} width="100%" alt={title} />
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
