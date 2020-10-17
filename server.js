const express = require('express');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(htmlRoutes);

app.listen(PORT, ()=>{
    console.log('Listening on port ' + PORT);
});