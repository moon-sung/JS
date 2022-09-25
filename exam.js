let products = [];
let cart = [];

$.get("store.json").done(function(data){
  products = data.products;
  
  for (var key in data) {
    //console.log(key); //name age출력
    for (let a = 0; a < 4; a++) {
      var cards = `
      <div class="card" style="width: 18rem;">
        <img src="img/${data[key][a].photo}" class="card-img-top p-3" alt="...">
        <div class="card-body">
        <h5 class="card-title">${data[key][a].title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${data[key][a].brand}</h6>
        <p class="card-text">가격 : ${data[key][a].price}</p>
        <a href="#" class="btn btn-dark">담기</a>
        </div>
      </div>`;
  
      $(".middle").append(cards);
    }
  }
})

//검색기능
$('.searchBtn').click(function(){
  let searchname = $('.searchText').val();

  let newcards = products.filter(function(a){
    return a.title.includes(searchname);
  }) //검색한 상품들만 골라서 newcards에 등록
  //console.log(newcards);

  $(".middle").html(''); //초기화하고

  newcards.forEach(function(data,i){
    $(".middle").append(`
    <div class="card" style="width: 18rem;">
      <img src="img/${data.photo}" class="card-img-top p-3" alt="...">
      <div class="card-body">
      <h5 class="card-title">${data.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${data.brand}</h6>
      <p class="card-text">가격 : ${data.price}</p>
      <a href="#" class="btn btn-dark">담기</a>
      </div>
    </div>`);
  })

  $(".middle h5").each(function(i,changetext){
    let title = changetext.innerHTML;
    //console.log(title);
    title = title.replace(searchname, `<span style="background : yellow">${searchname}</span>`);
    //console.log(title);
    changetext.innerHTML = title;
  });
})
    
    





// $(".searchBtn").click(function () {
//   let searchname = $(".searchText").val();
//   //html안에 있는거 지우고
//   //input값과 json파일title비교해서 일치하는거만 append
//   $(".middle").html("");

//   $.get("/store.json").done(function (data) {
//     //console.log(data);
//     for (var key in data) {
//       for (let a = 0; a < 4; a++) {
//         //console.log(data[key][a].title);
//         if (data[key][a].title.includes(searchname)) {
//           $.get("/store.json").done(function (data) {
//           });
//         }
//       }
//     }
//   });

// });
