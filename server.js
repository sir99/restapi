const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// models
const db = require("./app/models");

let whiteList = [
    'http://localhost:8081',
];
let corsOption = {
    origin: function(origin, callback) {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}
app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sync databases
db.sequelize.sync();

// posts routes
require("./app/routes/post.routes")(app);

// db.sequelize.sync({ force: true })
// .then((result) => {
//     console.log('drop and re-sycn db')
// }).catch((err) => {

// });

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to mySQL"
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});