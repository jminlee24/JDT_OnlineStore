const express = require("express");

const app = express();

const PORT = 3030;

const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://JDTOnlineStore.firebaseio.com",
});

db = getFirestore();

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

app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
