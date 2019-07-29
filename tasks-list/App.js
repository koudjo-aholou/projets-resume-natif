// !TO DO => Rajouter auto complete enseigneinput et produitInput
// FILTRER PAR PRIX ET MARQUE

//UI vars
const form = document.querySelector('#task-form');
const productList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const produitInput = document.querySelector('#task');
const prixInput = document.querySelector('#task-price'); 
const enseigneInput = document.querySelector('#task-enseigne');

//Load event Listener
LoadEventListener(); 

function LoadEventListener(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getProducts);

  // Add product event
  form.addEventListener('submit',addProduct);

  //Remove product event
  productList.addEventListener('click', removeProduct);

  //Clear product event
  clearBtn.addEventListener('click',clearProducts);
  
  //Filter product event
  filter.addEventListener('keyup',filterProducts);
}; 

//get product from local storage
function getProducts(){
  let products;
  if(localStorage.getItem('products') === null){
    products = [];
  }else{
    products = JSON.parse(localStorage.getItem('products'))
  }
  products.forEach(function(produit){
    //Create li
    const li = document.createElement('li');
    // add class
    li.className = "collection-item product alignement-li";

    //create text and append
    const wrapProduct = document.createElement('div');
    wrapProduct.className ="wrap-product wrap-font";

    const product = document.createElement('span');
    product.appendChild(document.createTextNode(produit.product));
    wrapProduct.appendChild(product)
    li.appendChild(wrapProduct);

    //create price
    const wrapPrice = document.createElement('div');
    wrapPrice.className ="wrap-price wrap-font";

    const price = document.createElement('span');
    //create txt append
    if(produit.price === ''){
      price.appendChild(document.createTextNode("Prix non définit"));
    }else if(produit.price !== ''){
      price.appendChild(document.createTextNode(produit.price + "€"));
    }

    wrapPrice.appendChild(price)
    li.appendChild(wrapPrice);

    //create brand
    const wrapBrand = document.createElement('div');
    wrapBrand.className ="wrap-brand wrap-font";
    const brand = document.createElement('span');
    brand.className ="brand";
    if(produit.brand === ''){
      brand.appendChild(document.createTextNode("Marque non définit"));
    }else{
      brand.appendChild(document.createTextNode(produit.brand));
    }
    wrapBrand.appendChild(brand)
    li.appendChild(wrapBrand);

    //create new link
    const wrapLink = document.createElement('div');
    wrapLink.className ="wrap-link";
    const link = document.createElement('a');

    //add a class
    link.className = "delete-item secondary-content";

    //add icon html
    link.innerHTML = "<i class='fa fa-remove'></i>";

    //append the link to li
    wrapLink.appendChild(link)
    li.appendChild(wrapLink);
    productList.appendChild(li);
  })
}

function addProduct(e){

  //Create li
  const li = document.createElement('li');
  // add class
  li.className = "collection-item product alignement-li";

  //create text and append
  const wrapProduct = document.createElement('div');
  wrapProduct.className ="wrap-product wrap-font";

  const product = document.createElement('span');
  product.appendChild(document.createTextNode(produitInput.value));
  wrapProduct.appendChild(product)
  li.appendChild(wrapProduct);

  //create price
  const wrapPrice = document.createElement('div');
  wrapPrice.className ="wrap-price wrap-font";
  const price = document.createElement('span');

  //create Price txt append
  if(prixInput.value === '' && produitInput.value !== '' ){
    price.appendChild(document.createTextNode("Prix non définit"));
  }else if(prixInput.value !== '' && produitInput.value !== ''){
    price.appendChild(document.createTextNode(prixInput.value + "€"));
  }
  wrapPrice.appendChild(price)
  li.appendChild(wrapPrice);
 
  //create brand
  const wrapBrand = document.createElement('div');
  wrapBrand.className ="wrap-brand wrap-font";
  const brand = document.createElement('span');
  brand.className ="brand";

  //create  Brand txt append
  if(enseigneInput.value === ''){
    brand.appendChild(document.createTextNode("Marque non définit"));
  }else{
    brand.appendChild(document.createTextNode(enseigneInput.value));
  }
  wrapBrand.appendChild(brand)
  li.appendChild(wrapBrand);

  //create new link
  const wrapLink = document.createElement('div');
  wrapLink.className ="wrap-link";
  const link = document.createElement('a');

  //add a class
  link.className = "delete-item secondary-content";

  //add icon html
  link.innerHTML = "<i class='fa fa-remove'></i>";

  //append the link to li
  wrapLink.appendChild(link)
  li.appendChild(wrapLink);

  //append li to ul
  productList.appendChild(li);

  //Store
  storeProductinLocalStorage(
    {
    product: produitInput.value, 
    price: prixInput.value, 
    brand: enseigneInput.value
  });

  //clear inputs
  produitInput.value = '';
  prixInput.value = '';
  enseigneInput.value ='';

e.preventDefault();
};
 
 //Store to local Storage
 function storeProductinLocalStorage(product){
  let products;
  if(localStorage.getItem('products') === null){
     products = [];
 }else{
     products = JSON.parse(localStorage.getItem('products'))
   }
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products))
}

function removeProduct(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm("Êtes vous sur de vouloir supprimer le produit ?")){
      e.target.parentElement.parentElement.parentElement.remove();
    } 
  } 
  //remove from local storage
  removeProductFromLocalStorage(e.target.parentElement.parentElement.parentElement)
}
//Remove from local storage
function removeProductFromLocalStorage(productItem){
  let products;
  if(localStorage.getItem('products') === null){
     products = [];
  }else{
     products = JSON.parse(localStorage.getItem('products'))
   }
   products.forEach(function(product, index){
    if(productItem.firstChild.textContent === product.product && productItem.firstChild.nextSibling.textContent === `${product.price}€` ){
      //console.log(products,"avant")
      products.splice(index,1)
     //console.log(products,"apres")
    }
   })
   localStorage.setItem('products', JSON.stringify(products));
}

function clearProducts(e){
//productList.innerHTML = '';
// ou
  while(productList.firstChild){
    productList.removeChild(productList.firstChild);
  }
  //Clear product from local storage
  clearProductFromLS();
}

function clearProductFromLS(){
  localStorage.clear();
}

function filterProducts(e){
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(function(product){
    const thisProduct = product.firstChild.textContent;
  //  console.log(product.firstChild)
     if(thisProduct.toLowerCase().indexOf(text) != -1){
      product.style.display = "flex";
     }else{
      product.style.display = "none";
     }
      });
  }

  /*
      //Filter by price
     if(thisPrice.toLowerCase().indexOf(text) != -1){
      product.style.display = "flex";
    }else{
      product.style.display = "none";
    }

    // Filter by brand
    if(thisBrand.toLowerCase().indexOf(text) != -1){
      product.style.display = "flex";
    }else{
      product.style.display = "none";
    }
    const thisPrice = product.firstChild.nextSibling.textContent;
     // console.log(thisPrice, "price")
    const thisBrand = product.firstChild.nextSibling.nextSibling.textContent;
  */