const Customer = require("./lib/Customer");
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const reservations = [];
const waitlists = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/reservation", (req, res) => {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.post("/api/reservation", function(req, res) {
  var newReservation = req.body;

  const name = newReservation.name;
  const phone = newReservation.phone;
  const email = newReservation.email;
  const id = newReservation.id;

  const customer = new Customer(name, phone, email, id);
  reservations.length < 5 ? reservations.push(customer) : waitlists.push(customer);
  res.json(newReservation);
});

app.get("/api/tables2", (req, res) => {
  res.json(reservations);
});

app.get("/api/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "viewTable.html"));
});

app.get("/api/waitlists", (req, res) => {
  res.json(waitlists);
});

app.listen(PORT, () => {
  console.log("listening on", PORT);
});
