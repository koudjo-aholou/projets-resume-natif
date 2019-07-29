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
  // Add product event
  form.addEventListener('submit',AddProduct);

  //Remove product event
  productList.addEventListener('click', removeProduct);

  //Clear product event
  clearBtn.addEventListener('click',clearProducts);

  //Filter product event
  filter.addEventListener('keyup',filterProducts);
}; 

function AddProduct(e){
  console.log(e)
  // if(produitInput.value === ''){
  //   alert('Ajouter un produit');
  // } 
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
  //create txt append
  if(prixInput.value === '' && produitInput.value !== '' ){
    price.appendChild(document.createTextNode("Prix non définit"));
  }else if(prixInput.value !== '' && produitInput.value !== ''){
    price.appendChild(document.createTextNode(prixInput.value + "€"));
  }
  wrapPrice.appendChild(price)
  li.appendChild(wrapPrice);
 
  prixInput.value = '';

  //create brand
  const wrapBrand = document.createElement('div');
  wrapBrand.className ="wrap-brand wrap-font";
  const brand = document.createElement('span');
  brand.className ="brand";
  if(enseigneInput.value === ''){
    brand.appendChild(document.createTextNode("Marque non définit"));
  }else{
    brand.appendChild(document.createTextNode(enseigneInput.value));
  }
  wrapBrand.appendChild(brand)
  li.appendChild(wrapBrand);

  enseigneInput.value ='';

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
  //li.appendChild(link);

  //append li to ul
  productList.appendChild(li);

  //clear input
  produitInput.value = '';

e.preventDefault();
};

function removeProduct(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm("Êtes vous sur de vouloir supprimer le produit ?")){
      e.target.parentElement.parentElement.parentElement.remove();
    } 
  } 
}

function clearProducts(e){
//productList.innerHTML = '';
// ou
  while(productList.firstChild){
    productList.removeChild(productList.firstChild);
  }
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