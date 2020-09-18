const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/authRoute")
const productRoutes = require('./routes/productRoute')

var cors = require('cors')

// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
const app = express();
app.listen(3001);
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use(authRoutes);
app.use(productRoutes);