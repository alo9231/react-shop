import { useParams } from 'react-router-dom';

function Detail({myProducts}){

    // 주소창의 :id 값을 가져옴
    let { id } = useParams();

    // 배열에서 해당 순서의 데이터 꺼내기
    // props로 받은 myProducts(실제로는 shoes)에서 id가 일치하는 상품 찾기
    let selectProduct = myProducts.find((x )=>( x.id == id))

    // 만약 데이터가 없을 때를 대비한 안전장치 (매우 중요!)
    if (!selectProduct) {
      return <div>상품이 존재하지 않습니다.</div>;
    }

  return(
     <div className="row">
        <div className="col-md-6">
          <img src={import.meta.env.BASE_URL + selectProduct.src} width="100%" alt={selectProduct.title}/>
        </div>
        <div className="col-md-6">
          <strong className="pt-5">{selectProduct.title}</strong>
          <p>{selectProduct.content}</p>
          <p>{selectProduct.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
    </div>
  )
 
}


export default Detail;