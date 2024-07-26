const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")
app.use('/public', express.static('public'));
const port = 8009;


dotenv.config({path:'./config.env'});

app.use(bodyParser.json());
app.use(express.json());

app.use(cookiParser());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})