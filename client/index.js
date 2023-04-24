const sellForm = document.querySelector(".sell_form");
const productsContainer = document.querySelector(".products_container");

const APIUrl = "http://localhost:3030/";
console.log(sellForm);

sellForm.addEventListener("submit", (e) => {
  e.preventDefault();

  sendData = {
    name: sellForm.name.value,
    description: sellForm.description.value,
    price: sellForm.price.value,
    quantity: sellForm.quantity.value,
    seller: sellForm.seller.value,
  };

  fetch(APIUrl + "addProduct", {
    method: "POST",
    body: JSON.stringify(sendData),
    headers: { "content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((jsonData) => {
      console.log(jsonData);
    });
});

function loadProducts(productsJson) {
  let products = productsJson.products;
  for (let product of products) {
    let el = createProductComponent(product);
    productsContainer.appendChild(el);
  }
}

function createProductComponent(productData) {
  const el = document.createElement("div");
  el.id = productData.id;
  const name = document.createElement("h2");
  name.innerText = productData.data.name;
  const price = document.createElement("p");
  price.innerText = "price: $" + productData.data.price;
  const description = document.createElement("p");
  description.innerText = "description: " + productData.data.description;
  const seller = document.createElement("p");
  seller.innerText = "seller: " + productData.data.seller;
  const buyButton = document.createElement("button");
  buyButton.innerText = "buy";
  buyButton.onclick = () => {
    console.log(el.id);
  };

  el.appendChild(name);
  el.appendChild(price);
  el.appendChild(description);
  el.appendChild(seller);
  el.appendChild(buyButton);
  return el;
}

async function load() {
  fetch(APIUrl + "getProducts")
    .then((res) => res.json())
    .then(loadProducts);
}

window.onload = () => {
  load();
};
