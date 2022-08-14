const express=require('express')
const controller=require('./controller');
route=express.Router();
const axios =require('axios');
route.get('/',(req,res)=>{
    axios.get('http://localhost:8000/api/users')
    .then(function(response){
        res.render('index',{users : response.data});
    })
    .catch(err=>{message:err.message})
})
route.get('/update/:id',(req,res)=>{
    axios.get(`http://localhost:8000/api/users/${req.params.id}`)
    .then(function(userdata){
        console.log(userdata)
        res.render('update',{user: userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
})
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.get('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports=route;