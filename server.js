const express = require('express');
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
const db_uri = 'mongodb://localhost:27017/bookstore';
mongoose.connect(db_uri). then(() => console.log('MongoDB Connected!')) .catch(error => console.log("Database Have Some Error: "+ error));
// API Port
const port = process.env.PORT || 3005;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const booksRoute = require('./Routes/booksRoute.js')
booksRoute(app)

app.listen(port, function() {
    console.log(`Server started on port ${port}`);
})

