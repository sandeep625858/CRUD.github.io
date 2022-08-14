const express=require('express');
require('dotenv').config();
const app=express();
app.use(express.static('public'));
const morgan=require('morgan');
const bodyparser=require('body-parser');
const connectDB=require('./config/connection');
const PORT=8000;
app.use(morgan('tiny'));
connectDB();

app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use('/',require('./routes/router'))
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})