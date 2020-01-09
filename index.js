const Customer = require("./lib/Customer");
const path = require("path");

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("listening on", PORT));

const reservations = [];
const waitlist = [];

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/api/reservation", (req, res) => res.sendFile(path.join(__dirname, "reserve.html")));
app.get("/api/tables", (req, res) => res.sendFile(path.join(__dirname, "viewTable.html")));
app.get("/api/viewReservations", (req, res) => res.json(reservations));
app.get("/api/viewWaitlist", (req, res) => res.json(waitlist));

app.post("/api/reservation", (req, res) => {
  const { name, phone, email } = req.body;
  const customer = new Customer(name, phone, email);
  let status;
  if (reservations.length < 5) {
    reservations.push(customer);
    status = "Your reservation is confirmed.";
  } else {
    waitlist.push(customer);
    status = "You are #" + waitlist.length + " on the waitlist";
  }
  res.send(status);
});

app.post("/api/clear", (req, res) => {
  reservations.length = 0;
  waitlist.length = 0;
  res.send("Reservations and wait list are cleared.");
});
