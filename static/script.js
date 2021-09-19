const container = document.querySelector('.container');
// Getting all the items from api ans storing it in items array
const getItems = async(from,to)=>{
  let items = [];
    const response = await fetch(`https://fakestoreapi.com/products/`);
    items = await response.json();
    //Running loop to show items on the viewport
  for(i=from;i<=to;i++){
    let curEle = items[i];
    const div = `<div class="posts">
      <div class="post-id">
         <h1>${curEle.id}</h1>
      </div>
        <div class="title">
        <h2>${curEle.title}</h2>
        </div>
        <div class="post-img">
          <img src="${curEle.image}" alt="male model">
        </div>
        <div class="description">
          <p>${curEle.description}</p>
        </div>
        <div class="price"><h3>$ ${curEle.price}</h3></div>
        <a class="btn" href="/cart/">Add to Cart</a>
    </div>`;
    //Pushing HTML to the server
    container.insertAdjacentHTML('beforeend',div);
  }
}
//Call function to get four items at a time
let j=4;
getItems(0,j);

//Publishing items after every 0.3sec to apply scroll effect 
const newItems=()=>{
  setTimeout(()=>{
    getItems(j+1,j+5)
    j=j+5;
  },300)
}
//Listening to scroll event to render more money
window.addEventListener('scroll',()=>{
  const {scrollHeight,scrollTop,clientHeight} = document.documentElement;
  if(scrollTop+clientHeight>=scrollHeight){
    if(j>20){
      container.insertAdjacentHTML('beforeend',"<h1>that's all</h1>");
    }else{
      newItems();
    }
  }
})
