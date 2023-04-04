const sellForm = document.querySelector(".sell_form");

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
