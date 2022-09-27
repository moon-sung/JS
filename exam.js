let products = [];
let cart = [];

//페이지 로드시 카드만들기
$.get("store.json").done(function (data) {
  products = data.products; //원본데이터 다른곳에서 많이 쓰니 전역변수에 보관

  //페이지로드시 json 데이터가져와서 메인페이지 내용 만들기
  data.products.forEach((data, i) => {
    $(".middle").append(`
      <div class="card carditem" data-id="${data.id}" style="width: 18rem;" draggable="true">
        <img src="img/${data.photo}" class="card-img-top p-3" alt="...">
        <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${data.brand}</h6>
        <p class="card-text">가격 : ${data.price}</p>
        <a href="#" class="btn btn-dark add" data-id="${data.id}">담기</a>
        </div>
      </div>`);
  });

  //담기버튼 누르면
  //findIndex 메서드는 해당 조건에 만족하는 첫 번째 요소의 인덱스를 반환하며 만족하지 않으면 -1을 반환합니다.
  $(".add").click(function (e) {
    //console.log("target:", e);
    let presentId = e.target.dataset.id; //버튼클릭한거 id
    //클릭한거 id랑 장바구니에 있는거 id랑 비교
    let check = cart.findIndex(function (e) {
      return e.id == presentId;
    });

    if (check == -1) {
      //장바구니에 id 일치하는게 없으면
      //find 메서드는 해당 조건에 만족하는 첫 번째 요소의 값을 반환하며 만족하지 않으면 undefined를 반환합니다.
      let current = products.find(function (e) {
        return e.id == presentId;
      });
      current.count = 1; //current안에 count만들어서 그걸 1로
      //console.log(current);
      cart.push(current);
    } else {
      cart[check].count++; //이미 있으면 count를 증가
    }
    //console.log(cart);
    let totalprice=0; // 최종가격

    $(".store").html("");
    cart.forEach(function (a, i) {
      $(".store").append(`
      <div class="card text-dark store-card" data-id="${a.id}" style="width: 180px; height="200px" draggable="true">
      <img src="img/${a.photo}" class="card-img-top p-3" alt="...">
      <div class="card-body">
      <h6 class="card-title">${a.title}</h6>
      <h6 class="card-subtitle mb-2 text-muted">${a.brand}</h6>
      <input type="number" value="${a.count}" class="item-count w-100">
      <p class="card-text">개당 가격 : ${a.price}</p>
      </div>
    </div>`);
      totalprice += a.price * a.count;
      
    });
    $('.totalbox p').html('');
    $('.totalbox p').html(`합계 : ${totalprice}`);
  });

  //검색기능
  $(".searchBtn").click(function () {
    let searchname = $(".searchText").val();

    let newcards = products.filter(function (a) {
      return a.title.includes(searchname);
    }); //검색한 상품들만 골라서 newcards에 등록
    //console.log(newcards);

    $(".middle").html(""); //초기화하고

    newcards.forEach(function (data, i) {
      $(".middle").append(`
      <div class="card carditem" data-id="${data.id}" style="width: 18rem;" draggable="true">
        <img src="img/${data.photo}" class="card-img-top p-3" alt="...">
        <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${data.brand}</h6>
        <p class="card-text">가격 : ${data.price}</p>
        <a href="#" class="btn btn-dark add" data-id="${data.id}">담기</a>
        </div>
      </div>`);
    });
    
    $(".middle h5").each(function (i, changetext) {
      let title = changetext.innerHTML;
      //console.log(title);
      title = title.replace(
        searchname,
        `<span style="background : yellow">${searchname}</span>`
      );
      //console.log(title);
      changetext.innerHTML = title;
    });
  });
  
  //드래그하면 장바구니 담기는 기능
  $(".card").on("dragstart", function (e) {
    e.originalEvent.dataTransfer.setData("id", e.target.dataset.id);
    //console.log("target:", e);
  });
  $(".store").on("dragover", function (e) {
    e.preventDefault();
  });
  $(".store").on("drop", function (e) {
    let productId = e.originalEvent.dataTransfer.getData("id");
    //console.log(productId);
    $('.add').eq(productId).click(); //드랍하면 클릭한거와같은기능실행
  });
});
