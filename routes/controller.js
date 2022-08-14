const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type : String,
        require: true
    }
})

var Userdb=mongoose.model('userdb',schema);

exports.create = (req,res)=>{
    const user=new Userdb({
        name: req.body.name
    })

    user.save(user).then(data=>{
        //res.send(data);
        res.redirect('http://localhost:8000/')
    })
    .catch(err=>{
        res.status(500).send({
            message : err.message
        })
    })

}

exports.find = (req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Userdb.find(id)
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message})
        })
    }
    else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message})
        })
    }
}

exports.update = (req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:'cannot update user'})
        }
        else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message: err.message})
    })
}

exports.delete = (req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:'cannot delete user'})
        }
        else{
            res.send({
                message: "user was deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message: err.message})
    })
}