const express = require("express");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;

const app = express();

app.engine("handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      math: function (lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
          "+": lvalue + rvalue,
          "-": lvalue - rvalue,
          "*": lvalue * rvalue,
          "/": lvalue / rvalue,
          "%": lvalue % rvalue,
        }[operator];
      },
    },
  })
);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var tables = [];
var waitList = [];

//API ROUTES
app.get("/api/tables", (req, res) => {
  res.json(tables);
});

app.post("/api/reservation", (req, res) => {
  const { name, phoneNumber, email, uniqueId } = req.body;
  if (name && phoneNumber && email && uniqueId) {
    if (!reservationExists(uniqueId)) {
      const reservation = { name, phoneNumber, email, uniqueId };
      tables.length < 5 ? tables.push(reservation) : waitList.push(reservation);
      res.json({ success: true, reservation });
    } else {
      return res.json({
        success: false,
        message: "Error reservation already exists.",
      });
    }
  } else {
    return res.json({ success: false, message: "Some data is missing." });
  }
});

app.get("/api/waitlist", (req, res) => {
  res.json(waitList);
});

app.get("/api/clear", (req, res) => {
  tables = [];
  waitList = [];
  res.json(tables);
});

//HTML ROUTES
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/tables", (req, res) => {
  res.render("tables", { waitList, tables});
});

app.get("/reserve", (req, res) => {
  res.render("reserve");
});

function reservationExists(id) {
  for (let i = 0; i < tables.length; i++) {
    if (tables[i].uniqueId == id) {
      return true;
    }
  }
  for (let i = 0; i < waitList.length; i++) {
    if (waitList[i].uniqueId == id) {
      return true;
    }
  }
  return false;
}

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
