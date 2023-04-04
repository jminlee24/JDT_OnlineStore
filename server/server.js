const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 3030;

const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://JDTOnlineStore.firebaseio.com",
});

db = getFirestore();

function validProduct(data) {
  return (
    data.name && data.description && data.price && data.quantity && data.seller
  );
}

app.get("/", (request, response) => {
  console.log("received get request!");
  response.send("hello!");
});

app.get("/test", (request, response) => {
  console.log("received get request on test!");
  response.send("test!");
});

app.get("/getProducts", async (req, res) => {
  const productsCol = db.collection("Products");
  const snapshot = await productsCol.get();
  const docData = snapshot.docs.map((doc) => doc.data());
  console.log(docData);
});

app.post("/addProduct", async (req, res) => {
  if (validProduct(req.body)) {
    const productsCol = db.collection("Products");
    const doc = await productsCol.add({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      seller: req.body.seller,
    });
  } else {
    res.send({ error: "invalid product!" });
  }
});

app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
